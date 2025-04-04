let boardSize, board, targetRowSums, targetColSums;
window.initGame = initGame;

function showGridSizeSelector() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.style.display = 'none';

  document.getElementById('gridSizeSelector').style.display = 'block';
  document.getElementById('overlay').classList.remove('show');
  document.getElementById('popup').classList.remove('show');
  document.getElementById('giveUpButton').style.display = 'none';
}

function generateRandomBinaryArray() {
  return Array.from({ length: boardSize }, () => Math.round(Math.random()));
}

function binaryToDecimal(binaryArray) {
  return binaryArray.reduce((acc, bit, index) => acc + bit * Math.pow(2, boardSize - index - 1), 0);
}

function generateSums() {
  let tempBoard = Array.from({ length: boardSize }, generateRandomBinaryArray);
  targetRowSums = tempBoard.map(row => binaryToDecimal(row));
  targetColSums = Array.from({ length: boardSize }, (_, colIndex) => binaryToDecimal(tempBoard.map(row => row[colIndex])));
}

function createBoard() {
  // Inicializa la matriz con valores de 0
  board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));

  // Obtén el contenedor principal
  const app = document.getElementById('app');
  app.innerHTML = ''; // Limpia cualquier contenido previo

  // Crea el contenedor del grid
  const grid = document.createElement('div');
  grid.className = 'grid'; // Clase CSS para el grid
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `repeat(${boardSize + 1}, 3rem)`; // Configura las columnas dinámicamente
  grid.style.gap = '0.5rem'; // Espaciado entre celdas
  app.appendChild(grid);

  // Genera las celdas de la matriz
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell off'; // Clase CSS para las celdas
      cell.onclick = () => toggleCell(row, col); // Asigna el evento de clic
      grid.appendChild(cell);
    }

    // Agrega una celda para la suma de la fila
    const sumCell = document.createElement('div');
    sumCell.className = 'cell number';
    sumCell.textContent = targetRowSums[row]; // Muestra la suma de la fila
    grid.appendChild(sumCell);
  }

  // Agrega las celdas para las sumas de las columnas
  for (let col = 0; col < boardSize; col++) {
    const sumCell = document.createElement('div');
    sumCell.className = 'cell number';
    sumCell.textContent = targetColSums[col]; // Muestra la suma de la columna
    grid.appendChild(sumCell);
  }

  // Agrega una celda vacía en la esquina inferior derecha
  grid.appendChild(document.createElement('div'));
}

function toggleCell(row, col) {
  board[row][col] ^= 1;
  updateBoard();
}

function updateBoard(checkWinCondition = true) {
  const cells = document.querySelectorAll('.grid .cell:not(.number)');
  cells.forEach((cell, index) => {
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;
    cell.className = `cell ${board[row][col] ? 'on' : 'off'}`;
  });

  updateSumCells();
  if (checkWinCondition) {
    checkWin();
  }
}

function calculateSum(array) {
  return array.reduce((sum, value, index) => sum + value * Math.pow(2, boardSize - index - 1), 0);
}

function updateSumCells() {
  const rowSumCells = document.querySelectorAll('.grid > .number:nth-child(' + (boardSize + 1) + 'n)');
  rowSumCells.forEach((cell, index) => {
    const sum = calculateSum(board[index]);
    cell.textContent = targetRowSums[index];
    cell.className = `cell number ${sum === targetRowSums[index] ? 'correct' : ''}`;
  });

  const colSumCells = document.querySelectorAll('.grid > .number:not(:nth-child(' + (boardSize + 1) + 'n))');
  colSumCells.forEach((cell, colIndex) => {
    const colArray = board.map(row => row[colIndex]);
    const sum = calculateSum(colArray);
    cell.textContent = targetColSums[colIndex];
    cell.className = `cell number ${sum === targetColSums[colIndex] ? 'correct' : ''}`;
  });
}

function checkWin() {
  const allCorrect = document.querySelectorAll('.cell.number.correct').length === boardSize * 2;
  if (allCorrect) {
    document.getElementById('overlay').classList.add('show');
    document.getElementById('popup').classList.add('show');
  }
}

function revealSolution() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const correctValue = (targetRowSums[row] >> (boardSize - col - 1)) & 1;
      board[row][col] = correctValue;
    }
  }
  updateBoard(false); // Don't check win condition

  // Change the "Give Up" button to a "Play Again" button
  const giveUpButton = document.getElementById('giveUpButton');
  giveUpButton.textContent = 'Jugar de nuevo';
  giveUpButton.onclick = showGridSizeSelector;
}

function initGame() {
  const giveUpButton = document.getElementById('giveUpButton');
  document.getElementById('gridSizeSelector').style.display = 'none';
  boardSize = parseInt(document.getElementById('gridSize').value);
  generateSums();
  createBoard();
  document.getElementById('app').style.display = 'block';
  giveUpButton.textContent = 'Abandonar';
  giveUpButton.onclick = revealSolution;
  giveUpButton.style.display = 'block';
}

showGridSizeSelector();

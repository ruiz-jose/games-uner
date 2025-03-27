import { defineConfig } from 'astro/config';
import starlight from "@astrojs/starlight";
//import d2 from "astro-d2";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import remarkHeadingID from 'remark-heading-id';
import remarkToc from 'remark-toc';
import vtbot from 'astro-vtbot';
//import type { SidebarItem } from 'node_modules/@astrojs/starlight/schemas/sidebar';
import starlightImageZoom from 'starlight-image-zoom';
import starlightUtils from "@lorenzo_lewis/starlight-utils";
import { visualizer } from "rollup-plugin-visualizer";

//import starlightBlog from 'starlight-blog';

// https://astro.build/config
export default defineConfig({
    site: 'https://ruiz-jose.github.io/games-uner/',
    base: process.env.NODE_ENV === 'production' ? '/games-uner/' : '',
	experimental: {
		svg: true,
	},
	devToolbar: { enabled: false },
	prefetch: process.env.NODE_ENV === "production",
	markdown: {
		rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {
			behavior: "wrap"
		}], [rehypeExternalLinks, {
			target: "_blank",
			content: {
				type: "text",
				value: "↗"
			}
		}]],
		remarkPlugins: [remarkToc, remarkHeadingID]
	},
	trailingSlash: 'ignore',
	integrations: [/*d2({
		skipGeneration: process.env.GITHUB_ACTIONS === "true"
	}), */ 
	  vtbot({ loadingIndicator: true, autoLint: false }), starlight({
		plugins: [//starlightBlog(),
			starlightImageZoom(),
			starlightUtils({
				multiSidebar: {
					switcherStyle: "horizontalList",
				}, navLinks: {
					leading: { useSidebarLabelled: "leading" },
				}
			}),
		],
		tableOfContents: {
			minHeadingLevel: 2,
			maxHeadingLevel: 4
		},
		components: {
			Head: "./src/components/starlight/Head.astro",
			PageTitle: "./src/components/starlight/PageTitle.astro",
			Pagination: "./src/components/starlight/FeelBack.astro",
			//MarkdownContent: "./src/components/MarkdownContent.astro"
		},
		title: "Colección de juegos",
		head: [{
			tag: "meta",
			attrs: {
				property: "og:image",
				content: "https://events-3bg.pages.dev/social.png"
			}
		}],
		customCss: ["./src/styles/custom.css"],
		description: "The Jotter of the Bag of Tricks for Astro's View Transitions",
		lastUpdated: true,
		pagination: true,
		logo: {
			src: "/node_modules/astro-vtbot/assets/bag-of-tricks.svg"
		},
		social: {
			github: "https://github.com/ruiz-jose/games-uner",
			blueSky: 'https://bsky.app/profile/martr.app'
		},
		editLink: {
			baseUrl: "https://github.com/martrapp/astro-vtbot-website/edit/main/"
		},
		sidebar: [ {
			label: "leading",
			items: [{
				label: "[C]",
				link: "/components/"
			}, {
				label: "[D]",
				link: "/demos/"
			}]
		}]
	})],
	vite: {
		build: {
			assetsInlineLimit: 0,
			rollupOptions: {
				external: ["/z.ts"]
			}
		},
		server: {
			fs: {
				allow: ['.', '/Users/', '/home/', '/workspaces/games-uner/']
			}
		},
		plugins: [visualizer({
			brotliSize: true
		})]
	}
});

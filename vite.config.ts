import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const basePath = process.env.BASE_PATH;

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				strict: true
			}),
			paths: {
				base: basePath ? (basePath as `/${string}`) : ''
			},
			prerender: {
				// Allow deploy when armory env vars are missing (landing page only).
				handleUnseenRoutes: 'ignore'
			}
		})
	]
});
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const __dirname = import.meta.dirname!;

const mainPath = import.meta.resolve(__dirname + '/src/client/index.html');
const errorPath = import.meta.resolve(__dirname + '/src/client/fallback.html');

export default defineConfig({
	plugins: [tailwindcss()],
	root: 'src/client',
	build: {
		outDir: '../../dist',
		rollupOptions: {
			input: {
				main: mainPath,
				error: errorPath,
			},
		},
	},
	resolve: {
		alias: {
			'@@utils': import.meta.resolve(__dirname + 'src/utils'),
		},
	},
});

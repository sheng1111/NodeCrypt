import {
	defineConfig
} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
	// Root directory
	// 根目錄
	root: 'client',
	// Base URL
	// 基底 URL
	base: './',
	// Plugins
	// 外掛
	plugins: [
		VitePWA({
			registerType: 'prompt',
			includeAssets: [
				'assets/favicon.svg',
				'assets/pwa-180.png',
				'assets/pwa-192.png',
				'assets/pwa-512.png'
			],
			manifest: {
				name: 'NodeCrypt',
				short_name: 'NodeCrypt',
				description: '端對端加密聊天系統',
				start_url: './',
				scope: './',
				display: 'standalone',
				theme_color: '#06c755',
				background_color: '#f6f7f9',
				icons: [
					{
						src: 'assets/pwa-180.png',
						sizes: '180x180',
						type: 'image/png'
					},
					{
						src: 'assets/pwa-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'assets/pwa-512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			},
			workbox: {
				navigateFallback: 'index.html',
				globPatterns: ['**/*.{js,css,html,svg,webp,png,ico}']
			},
			devOptions: {
				enabled: true
			}
		})
	],
	// Build options
	// 建置選項
	build: {
		// Output directory
		// 輸出目錄
		outDir: '../dist',
		// Empty output directory
		// 清空輸出目錄
		emptyOutDir: true,
		// Minify
		// 壓縮
		minify: 'terser',
		// Terser options
		// Terser 選項
		terserOptions: {
			compress: {
				// Drop console statements
				// 移除 console 陳述
				drop_console: false,
				// Drop debugger statements
				// 移除 debugger 陳述
				drop_debugger: false
			}
		},
		// Rollup options
		// Rollup 選項
		rollupOptions: {
			// Input file
			// 輸入檔案
			input: 'client/index.html',
			// Output options
			// 輸出選項
			output: {
				// Manual chunks
				// 手動分塊
				manualChunks: (id) => {
					if (id.includes('node_modules')) {
						if (/aes-js|elliptic|js-chacha20|js-sha256/.test(id)) {
							return 'crypto-libs'
						}
						return 'vendor-deps'
					}
					return undefined
				},
			},
		},
		// Sourcemap
		// 原始碼對應檔
		sourcemap: false,
		// CSS code split
		// CSS 程式碼分割
		cssCodeSplit: true,
		// Chunk size warning limit
		// 程式碼塊大小警告限制
		chunkSizeWarningLimit: 1000,
	},
	// Resolve options
	// 解析選項
	resolve: {
		// Alias
		// 別名
		alias: {
			buffer: 'buffer',
		},
	},
	// Server options
	// 伺服器選項
	server: {
		// HMR
		// 熱模組替換
		hmr: true,
		// Open browser
		// 開啟瀏覽器
		open: true,
	},
	// Optimize dependencies
	// 最佳化依賴
	optimizeDeps: {
		// Include
		// 包含
		include: ['buffer', 'aes-js', 'elliptic', 'js-chacha20', 'js-sha256', '@dicebear/core', '@dicebear/micah'],
	},
});

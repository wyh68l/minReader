import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
const path = require('path');
export default defineConfig({
  plugins: [
    uni(),
  ],
	resolve:{
		//设置路径别名
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "https://www.biqudu.net",
				changeOrigin: true,
				// rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
})

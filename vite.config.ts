import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
// TODO: есть ошибка с опредлением типов для плагина
// https://github.com/gxmari007/vite-plugin-eslint/issues/74
// import eslintPlugin from 'vite-plugin-eslint'
import checker from 'vite-plugin-checker'

export default defineConfig({
  server: {
    port: 5000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      find: '@vue/runtime-core',
      replacement: '@vue/runtime-core/dist/runtime-core.esm-bundler.js'
    },
    extensions: ['.js', '.ts', '.vue']
  },
  plugins: [
    vue(),
    // https://github.com/gxmari007/vite-plugin-eslint/issues/74
    // eslintPlugin({ cache: false }),
    checker({
      vueTsc: true
    })
  ]
})

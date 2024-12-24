import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { SondaRollupPlugin } from 'sonda'

// https://vite.dev/config/
export default defineConfig(({ mode }) => (
  {
  plugins: [
    vue(),
    mode === 'development' && vueDevTools(),
    mode === 'sonda' && SondaRollupPlugin({
      filename: 'dist/sonda-report.html',
      sources: true
    }),
  ].filter(Boolean), // Filter out false values

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  build: {
    sourcemap: mode === 'sonda',
    outDir: 'dist/vue',
  },
}))

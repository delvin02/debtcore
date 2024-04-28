import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevTools from 'vite-plugin-vue-devtools';
// Import resolve from path module
import { resolve } from 'path';
import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"
import path from "path"


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5174,
    hmr: {
      host: '0.0.0.0'
    },
    watch: {
      usePolling: true
    },
    host: true
  },
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
  ],
  define: {
    VITE_BACKEND_URL: process.env.VITE_BACKEND_URL
    },
   css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      //'@': fileURLToPath(new URL('./src', import.meta.url)),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["oh-vue-icons/icons"],
  },
  ssr: {
    noExternal: ["oh-vue-icons"],
  },
  build: {
    outDir: '../app/static/vue',
    rollupOptions: {
      input: {
        main: resolve('./src/main.ts'),
      },
      output: {
        dir: '../app/static/vue/',
        entryFileNames: 'main.js',
      },
    },
  },
});
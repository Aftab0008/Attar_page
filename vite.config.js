// vite.config.js or vite.config.mjs
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss' // ✅ correct import (not '@tailwindcss/vite')
import autoprefixer from 'autoprefixer' // optional, for CSS compatibility

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
})

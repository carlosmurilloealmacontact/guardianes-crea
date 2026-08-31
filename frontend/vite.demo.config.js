import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Config dedicada para empacar la demo en un solo archivo (sin code-splitting),
// usada solo para generar el HTML autocontenido que se publica como Artifact.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-demo',
    rollupOptions: {
      input: resolve(__dirname, 'demo.html'),
      output: {
        format: 'iife',
        inlineDynamicImports: true,
        entryFileNames: 'demo.js',
        assetFileNames: 'demo.[ext]',
      },
    },
  },
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Separar la librería de animación del bundle principal: el preloader
        // puede pintar antes de que motion termine de descargarse.
        // Vite 8 va sobre rolldown, que exige la forma de función.
        manualChunks(id) {
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
            return 'motion';
          }
        },
      },
    },
  },
});

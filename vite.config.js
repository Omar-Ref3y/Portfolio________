import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    })
  ],
  base: '/',
  build: {
    outDir: 'dist',
  },
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.ico'],
});

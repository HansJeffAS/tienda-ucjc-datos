import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.js',
      name: 'UcjcMicrofrontend',
      fileName: () => 'index.js',
      formats: ['es']
    }
  }
});
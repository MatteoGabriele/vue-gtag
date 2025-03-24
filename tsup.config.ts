import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    clean: true,
    format: ['esm'],
    minify: false,
    dts: true,
    outDir: './dist',
  },
  {
    entry: ['./src/index.ts'],
    clean: true,
    format: ['esm'],
    minify: true,
    dts: false,
    outDir: './dist',
    outExtension: () => ({
      js: '.min.js',
    }),
  },
]);
import { defineConfig } from 'tsdown'
import path from "node:path";
import { name } from './package.json'

export default defineConfig({
  entry: {
    [name]: './src/index.ts'
  },
  platform: 'browser',
  format: ['esm'],
  minify: true,
  external: ['vue', 'vue-router'],
  outDir: "./dist",
  publint: true,
  dts: true,
  clean: true,
  inputOptions: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      }
    }
  },
})
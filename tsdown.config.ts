import { defineConfig } from 'tsdown'
import { name } from './package.json'

export default defineConfig({
  entry: {
    [name]: './src/index.ts'
  },
  platform: 'browser',
  minify: true,
  publint: true,
  dts: true,
})
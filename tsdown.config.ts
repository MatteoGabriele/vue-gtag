import { defineConfig } from 'tsdown'
import pkg from './package.json' with { type: 'json' }

export default defineConfig({
  entry: {
    [pkg.name]: './src/index.ts'
  },
  platform: 'browser',
  minify: true,
  publint: true,
  dts: true,
})
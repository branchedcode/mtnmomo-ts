import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  minify: true,
  treeshake: true,
  splitting: false,
  shims: true,
  clean: true,
  dts: true,
  outDir: 'dist',
})

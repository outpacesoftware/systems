import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    // Individual primitives for tree-shaking
    'primitives/Button/index': 'src/primitives/Button/index.ts',
    'primitives/Input/index': 'src/primitives/Input/index.ts',
    'primitives/Checkbox/index': 'src/primitives/Checkbox/index.ts',
    'primitives/Switch/index': 'src/primitives/Switch/index.ts',
    'primitives/Select/index': 'src/primitives/Select/index.ts',
    'primitives/Dialog/index': 'src/primitives/Dialog/index.ts',
    'primitives/Tooltip/index': 'src/primitives/Tooltip/index.ts',
  },
  format: ['esm'],
  dts: true,
  splitting: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  minify: false,
  sourcemap: true,
  outDir: 'dist',
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});

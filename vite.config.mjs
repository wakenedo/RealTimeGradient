import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// Library mode
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "RealTimeGradient",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      // Mark external deps so they’re not bundled
      external: [],
      output: {
        globals: {},
      },
    },
  },
  plugins: [dts()],
});

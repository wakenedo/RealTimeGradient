import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// Library mode
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "RealTimeGradient",
      fileName: (format) => `index.${format}.js`,
    },
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

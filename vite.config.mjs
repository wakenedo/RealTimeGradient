import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // ✅ JS only
      name: "RealTimeGradient",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [
    dts({
      entryRoot: "src",
      outDir: "dist",
      insertTypesEntry: true,
    }),
  ],
});

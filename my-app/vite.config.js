import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://dev.to/tilly/aliasing-in-vite-w-typescript-1lfo

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("./src"), // @ trỏ đến thư mục src
      "@component": path.resolve("src/component"),
    },
  },
});

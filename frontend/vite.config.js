import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import copyAssetsPlugin from "./vite-plugin-copy-assets";


export default defineConfig({
  plugins: [react(), copyAssetsPlugin()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    assetsDir: "assets",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  publicDir: "public",
});

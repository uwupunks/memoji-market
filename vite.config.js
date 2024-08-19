import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nodePolyfills from "vite-plugin-node-stdlib-browser";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  build: {
    target: "ES2022",
  },
  esbuild: {
    target: "ES2022",
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "ES2022",
    },
  },
  resolve: {
    alias: {
      components: "/src/components",
      assets: "/src/assets",
      hooks: "/src/hooks",
      src: "/src",
    },
  },
  assetsInclude: ["**/*.vox"],
});

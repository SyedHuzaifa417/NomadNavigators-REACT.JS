import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: false, // Disable CSS source maps in development
  },
  build: {
    sourcemap: false, // Optionally, disable source maps for JavaScript as well
  },
});

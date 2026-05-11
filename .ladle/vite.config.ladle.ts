import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    outDir: 'docs',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    }
  }
})
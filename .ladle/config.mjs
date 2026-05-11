import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
  port: 7007,
  viteConfig: resolve(__dirname, 'vite.config.ladle.ts')
}

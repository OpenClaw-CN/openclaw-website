/**
 * 构建前将根目录 ads.json 复制到 docs/public/ads.json，
 * 以便运行时通过 /ads.json 读取（优先于构建注入）。
 */
import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'ads.json')
const destDir = join(root, 'docs', 'public')
const dest = join(destDir, 'ads.json')

if (existsSync(src)) {
  mkdirSync(destDir, { recursive: true })
  copyFileSync(src, dest)
  console.log('[copy-ads] copied ads.json to docs/public/ads.json')
} else {
  console.warn('[copy-ads] root ads.json not found, skip copy')
}

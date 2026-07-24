import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Config } from '@react-router/dev/config';
import { writeCrawlerResources } from './scripts/crawl-resources';

const pagesFile = fileURLToPath(new URL('./content/site-pages.json', import.meta.url));
const pages = JSON.parse(readFileSync(pagesFile, 'utf8')) as Array<{ path: string }>;

export default {
  appDirectory: 'src',
  buildDirectory: 'build',
  ssr: false,
  prerender: [...pages.map((page) => page.path), '/404'],
  routeDiscovery: { mode: 'initial' },
  async buildEnd() {
    await writeCrawlerResources();
  },
} satisfies Config;

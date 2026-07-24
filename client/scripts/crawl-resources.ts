import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

interface CrawlablePage {
  path: string;
  title: string;
  description: string;
  lastModified: string;
}

const origin = 'https://www.mcadamsdevelopment.com';
const contentDirectory = resolve(process.cwd(), 'content');
const outputDirectory = resolve(process.cwd(), 'build/client');

function absoluteUrl(path: string) {
  return new URL(path, origin).toString();
}

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character] ?? character);
}

async function getPages(): Promise<CrawlablePage[]> {
  const source = await readFile(resolve(contentDirectory, 'site-pages.json'), 'utf8');
  return JSON.parse(source) as CrawlablePage[];
}

export async function writeCrawlerResources() {
  const pages = await getPages();
  await mkdir(outputDirectory, { recursive: true });

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pages.map((page) => [
      '  <url>',
      `    <loc>${escapeXml(absoluteUrl(page.path))}</loc>`,
      `    <lastmod>${page.lastModified}</lastmod>`,
      '  </url>',
    ].join('\n')),
    '</urlset>',
    '',
  ].join('\n');

  const llms = [
    '# McAdams Development',
    '',
    '> McAdams Development creates custom websites, web applications, mobile applications, cloud solutions, DevOps systems, and UI/UX design for growing businesses.',
    '',
    '## Primary pages',
    '',
    ...pages.map((page) => `- [${page.title}](${absoluteUrl(page.path)}): ${page.description}`),
    '',
    '## Contact',
    '',
    '- Phone: +1-470-344-5563',
    '- Email: info@mcadamsdevelopment.com',
    '',
    `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
    '',
  ].join('\n');

  await Promise.all([
    writeFile(resolve(outputDirectory, 'sitemap.xml'), sitemap, 'utf8'),
    writeFile(resolve(outputDirectory, 'llms.txt'), llms, 'utf8'),
    writeFile(
      resolve(outputDirectory, 'robots.txt'),
      `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`,
      'utf8',
    ),
  ]);
}

export async function ensureParentDirectory(filePath: string) {
  await mkdir(dirname(filePath), { recursive: true });
}

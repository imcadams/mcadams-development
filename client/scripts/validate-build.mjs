import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const output = resolve(root, 'build/client');
const origin = 'https://www.mcadamsdevelopment.com';
const pages = JSON.parse(
  await readFile(resolve(root, 'content/site-pages.json'), 'utf8'),
);

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"');
}

function pageFile(pathname) {
  return pathname === '/'
    ? resolve(output, 'index.html')
    : resolve(output, pathname.slice(1), 'index.html');
}

async function assertFile(filePath) {
  try {
    await stat(filePath);
  } catch {
    throw new Error(`Expected generated file does not exist: ${filePath}`);
  }
}

for (const page of pages) {
  const htmlFile = pageFile(page.path);
  await assertFile(htmlFile);
  const html = decodeHtml(await readFile(htmlFile, 'utf8'));
  const canonical = new URL(page.path, origin).toString();
  const expected = [
    `<title>${page.title} | McAdams Development</title>`,
    `name="description" content="${page.description}"`,
    `rel="canonical" href="${canonical}"`,
    'property="og:title"',
    'application/ld+json',
  ];

  for (const value of expected) {
    if (!html.includes(value)) {
      throw new Error(`${page.path} is missing required generated HTML: ${value}`);
    }
  }
}

for (const file of ['robots.txt', 'sitemap.xml', 'llms.txt']) {
  await assertFile(resolve(output, file));
}

const notFound = resolve(output, '404.html');
await assertFile(notFound);
if (!(await readFile(notFound, 'utf8')).includes('noindex,nofollow')) {
  throw new Error('404.html must be marked noindex,nofollow.');
}

const sitemap = await readFile(resolve(output, 'sitemap.xml'), 'utf8');
for (const page of pages) {
  const canonical = new URL(page.path, origin).toString();
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) {
    throw new Error(`Sitemap is missing ${canonical}`);
  }
}

const llms = await readFile(resolve(output, 'llms.txt'), 'utf8');
if (!llms.includes('# McAdams Development') || !llms.includes('## Primary pages')) {
  throw new Error('llms.txt does not contain the required site overview.');
}

console.log(`Validated ${pages.length} prerendered pages and crawler resources.`);

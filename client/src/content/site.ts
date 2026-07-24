import pages from '../../content/site-pages.json';

export const SITE_ORIGIN = 'https://www.mcadamsdevelopment.com';
export const SITE_NAME = 'McAdams Development';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/mcadams-development-social-preview.png`;

export type PageSchemaType =
  | 'WebPage'
  | 'AboutPage'
  | 'ContactPage'
  | 'Service';

export interface SitePage {
  path: string;
  title: string;
  description: string;
  type: PageSchemaType;
  lastModified: string;
}

export const sitePages = pages as SitePage[];

export function getSitePage(path: string): SitePage {
  const page = sitePages.find((candidate) => candidate.path === path);

  if (!page) {
    throw new Error(`Missing page metadata for ${path}`);
  }

  return page;
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_ORIGIN).toString();
}

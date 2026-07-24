import pages from '../../content/site-pages.json';

export const SITE_ORIGIN = 'https://www.mcadamsdevelopment.com';
export const SITE_NAME = 'McAdams Development';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/mcadams-development-social-preview.png`;

export type PageSchemaType =
  | 'WebPage'
  | 'AboutPage'
  | 'ContactPage'
  | 'Service';

export interface SolutionBenefit {
  title: string;
  description: string;
}

export interface SolutionStep {
  title: string;
  description: string;
}

export interface SolutionFaq {
  question: string;
  answer: string;
}

export interface SolutionContent {
  slug: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  audience: string;
  benefits: SolutionBenefit[];
  capabilities: string[];
  steps: SolutionStep[];
  faqs: SolutionFaq[];
}

export interface SitePage {
  path: string;
  title: string;
  description: string;
  type: PageSchemaType;
  lastModified: string;
  solution?: SolutionContent;
}

export interface SolutionPage extends SitePage {
  solution: SolutionContent;
}

export const sitePages = pages as SitePage[];

export function getSitePage(path: string): SitePage {
  const page = sitePages.find((candidate) => candidate.path === path);

  if (!page) {
    throw new Error(`Missing page metadata for ${path}`);
  }

  return page;
}

export function getSolutionPage(slug: string | undefined): SolutionPage | undefined {
  const page = sitePages.find((candidate): candidate is SolutionPage =>
    candidate.solution?.slug === slug,
  );

  return page;
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_ORIGIN).toString();
}

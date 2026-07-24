import type { MetaDescriptor } from 'react-router';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
  type SitePage,
} from './site';

function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    logo: DEFAULT_OG_IMAGE,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-470-344-5563',
      contactType: 'customer service',
      email: 'info@mcadamsdevelopment.com',
    },
  };
}

export function pageMeta(page: SitePage): MetaDescriptor[] {
  const url = absoluteUrl(page.path);
  const title = `${page.title} | ${SITE_NAME}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        name: SITE_NAME,
        url: SITE_ORIGIN,
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
      },
      {
        '@type': page.type,
        '@id': `${url}#webpage`,
        name: title,
        description: page.description,
        url,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        about: { '@id': `${SITE_ORIGIN}/#organization` },
      },
    ],
  };

  return [
    { title },
    { name: 'description', content: page.description },
    { name: 'robots', content: 'index,follow' },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: page.description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: DEFAULT_OG_IMAGE },
    { property: 'og:image:width', content: '1729' },
    { property: 'og:image:height', content: '910' },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:alt', content: `${SITE_NAME} logo` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: page.description },
    { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
    { name: 'twitter:image:alt', content: `${SITE_NAME} logo` },
    { 'script:ld+json': schema },
  ];
}

export const notFoundMeta: MetaDescriptor[] = [
  { title: `Page Not Found | ${SITE_NAME}` },
  { name: 'robots', content: 'noindex,nofollow' },
];

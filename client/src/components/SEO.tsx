import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  schemaType?: 'WebPage' | 'ContactPage' | 'AboutPage' | 'Service';
}

export function SEO({
  title = 'McAdams Development',
  description = 'McAdams Development is a leading software development company specializing in custom solutions for businesses of all sizes.',
  canonicalUrl = 'https://www.mcadamsdevelopment.com',
  ogImage = 'https://www.mcadamsdevelopment.com/mcadams-development-badge.png',
  schemaType = 'WebPage',
}: SEOProps) {
  const siteTitle = title === 'McAdams Development' 
    ? 'McAdams Development | Custom Software Development Solutions' 
    : `${title} | McAdams Development`;

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'McAdams Development',
    url: 'https://www.mcadamsdevelopment.com',
    logo: 'https://www.mcadamsdevelopment.com/mcadams-development-badge.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '(470) 344-5563',
      contactType: 'customer service',
      email: 'info@mcadamsdevelopment.com',
    },
  };

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: siteTitle,
    description: description,
    url: canonicalUrl,
    publisher: {
      '@type': 'Organization',
      name: 'McAdams Development',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.mcadamsdevelopment.com/mcadams-development-badge.png',
      },
    },
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      baseSchema,
      pageSchema
    ]
  };

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
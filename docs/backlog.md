# Website Architecture Backlog

This backlog contains valuable follow-up work that is not required for the
initial crawlability and SEO implementation. Items should be promoted into the
implementation plan when content volume, user measurements, or product
requirements justify them.

## Content distribution

- Add an RSS or Atom feed when the blog is launched and has enough published
  content to make subscription useful.
- Add a sitemap index if the site approaches sitemap size limits.
- Add image or video sitemap extensions if the site begins publishing a
  material amount of indexable media.

## Performance optimization

- Self-host and subset the Inter font in WOFF2 format.
- Reduce the number of font weights and preload only the critical face.
- Add a reusable responsive-image component and image-generation pipeline when
  landing pages begin using substantial photographic content.
- Adopt AVIF/WebP generation for content imagery.
- Add below-the-fold media lazy loading where applicable.
- Evaluate delaying analytics until after initial rendering or user consent.
- Tighten JavaScript, CSS, image, LCP, CLS, and INP budgets after production
  baselines and field data are available.
- Add continuous Lighthouse testing if performance regressions become frequent
  or page complexity increases.
- Audit and reduce third-party scripts as integrations are added.

## Rendering and publishing

- Reconsider hybrid rendering only if pages require request-specific or
  personalized content.
- Reconsider incremental static regeneration only if full builds become too
  slow or publishing latency becomes unacceptable.
- Add editorial preview infrastructure if authors need unpublished previews.
- Evaluate MDX or a headless CMS when content authorship outgrows TypeScript or
  repository-managed content records.

## Internationalization

- Add localized route and metadata support for the planned `/es/` and `/pt/`
  sections.
- Generate `hreflang` links and localized sitemap entries.
- Establish locale-specific canonical and content fallback rules.

## Operations

- Convert AWS configuration into Terraform, CDK, or CloudFormation if
  infrastructure changes become frequent or additional environments are
  introduced.
- Add real-user performance monitoring when traffic volume makes field
  measurements actionable.
- Add automated broken-external-link checking with an appropriate retry and
  allowlist policy.


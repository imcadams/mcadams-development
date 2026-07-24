# Crawlability and SEO Architecture Plan

## Decision

Adopt build-time static prerendering using React Router Framework Mode with
runtime SSR disabled and prerendering enabled for every public route.

This preserves React, TypeScript, Vite, React Router, S3, and CloudFront while
producing route-specific HTML that contains the page content, metadata, social
tags, and structured data before JavaScript runs. React will hydrate the HTML
and retain the current single-page navigation experience.

Vike is the fallback if a proof of concept identifies a concrete blocker in
React Router's static-hosting integration. Runtime SSR, hybrid rendering, and
ISR are not recommended for the current marketing site because they would add
infrastructure and operational complexity without solving a present
request-time rendering requirement.

## Current-state findings

- The application uses React 18, Vite 5, and React Router 6 in declarative SPA
  mode.
- Direct requests initially receive an empty React root and generic metadata.
- `react-helmet-async` supplies useful page metadata, but only after JavaScript
  executes.
- The sitemap route list is manually duplicated and omits
  `/privacy-policy`.
- The committed sitemap and generated sitemap create two sources of truth.
- CloudFront converts origin 403 and 404 responses into `/index.html` with
  status 200, creating soft 404s.
- S3 is configured as a public website origin rather than a private REST
  origin protected by CloudFront Origin Access Control.
- No CI/CD workflow, automated deployment script, or infrastructure-as-code
  stack is checked into the repository.
- The Netlify-style `_redirects` file has no effect on S3 or CloudFront.

## Rendering options

1. **React Router Framework Mode with static prerendering — recommended.**
   It is the closest architectural evolution of the existing application,
   supports route-level metadata and code splitting, and emits static files
   suitable for S3.
2. **Vike with full prerendering — fallback.** It has strong Vite-native SSG
   support but would introduce another page and routing framework.
3. **A community Vite prerender plugin — tactical alternative only.** It
   minimizes initial migration but commonly duplicates route lists and offers
   a weaker long-term content architecture.
4. **Runtime SSR — not recommended now.** It requires a server or function
   runtime, monitoring, runtime caching, and additional failure modes.
5. **Hybrid rendering or ISR — defer.** Reconsider only if public pages later
   require request-specific content or full builds become operationally
   impractical.

## Target content model

Use one route/content registry as the source of truth for:

- Route path and component
- Indexing status
- Title and description
- Canonical path
- Open Graph type and image
- Sitemap inclusion and modification date
- Structured-data type
- Prerender enumeration

Solution pages, blog articles, and case studies should be derived from content
records so that adding content does not require separate edits to routing,
metadata, sitemap, and build configuration.

## Implementation phases

### Phase 0: Baseline and acceptance criteria

1. Install dependencies from the client lockfile in a clean environment.
2. Record the current production bundle sizes, representative Lighthouse
   results, direct-route response HTML, and HTTP status behavior.
3. Define completion criteria:
   - Every indexable URL returns page-specific HTML without requiring
     JavaScript.
   - Valid routes return 200 and unknown routes return a real 404.
   - Removed routes return an intentional 301 or 410.
   - Titles, descriptions, canonical URLs, Open Graph tags, and JSON-LD are
     present in response HTML.
   - The sitemap and prerender route set cannot drift.
   - Hydration produces no warnings.
   - Client navigation and contact submission continue to work.

### Phase 1: Normalize project and build ownership

1. Make `client/package.json` the single application manifest, or deliberately
   configure the repository as an npm workspace.
2. Remove the accidental root sitemap dependency.
3. Pin supported Node and npm versions.
4. Use deterministic `npm ci` installation in CI.
5. Establish separate lint, type-check, build, validation, and preview scripts.
6. Generate deployment artifacts only in build output, not in `public`.
7. Remove unused starter files and `_redirects` if no secondary host uses it.

### Phase 2: Migrate routing and prerender all public pages

1. Upgrade React Router through a separately tested migration.
2. Add React Router's Vite framework integration.
3. Convert the routes in `App.tsx` into route modules.
4. Convert `MainLayout` into the root route layout.
5. Preserve existing page components and styling where practical.
6. Disable runtime SSR and prerender every public route.
7. Enumerate solution, blog, and case-study URLs from the content registry.
8. Generate a static 404 document.
9. Verify direct navigation, client navigation, forms, hash links, scroll
   restoration, and hydration.

### Phase 3: Produce metadata in generated HTML

1. Replace page-level Helmet usage with route metadata exports or a typed
   metadata layer that participates in prerendering.
2. Define global defaults once.
3. Generate absolute canonical URLs from the production origin and normalized
   route path.
4. Ensure every page has one unique title, description, and canonical URL.
5. Add `robots`, `og:site_name`, `og:locale`, image dimensions, image MIME
   type, image alt text, and appropriate Twitter/X fields.
6. Add article-specific dates and `og:type` for blog articles.
7. Create a suitable 1200x630 default social preview image.
8. Mark the 404 document `noindex, nofollow`.
9. Remove `react-helmet-async` after the new metadata path fully owns the
   document head.

### Phase 4: Structured data

1. Create typed JSON-LD builders.
2. Provide site-wide `Organization` and `WebSite` entities with stable `@id`
   values.
3. Add appropriate page-level entities, including `WebPage`, `AboutPage`,
   `ContactPage`, `Service`, `BlogPosting`, `Article`, and `BreadcrumbList`.
4. Add `FAQPage` only when matching FAQs are visibly present.
5. Match every structured-data claim to visible and accurate page content.
6. Validate generated output in CI and with structured-data testing tools.

### Phase 5: Sitemap, robots, and AI-readable discovery

1. Generate `sitemap.xml` into the final build directory.
2. Use the route/content registry as the sole source of sitemap URLs.
3. Include every canonical indexable page and exclude redirects, 404s,
   `noindex` pages, and query variants.
4. Derive meaningful `lastmod` values from content metadata or source history.
5. Keep `robots.txt` simple and point it to the canonical sitemap.
6. **Implement `/llms.txt` as part of the initial release.**
7. Generate or maintain `llms.txt` from the same site/content configuration
   where practical so it does not become stale.
8. Include a concise site description, canonical links to primary pages,
   solution categories, contact information, and links to blog and case-study
   indexes when those sections exist.
9. Validate that `robots.txt`, `sitemap.xml`, and `llms.txt` return 200 with
   plain-text or XML content types as appropriate.

`llms.txt` is supplemental discovery material. It does not replace semantic
HTML, correct status codes, the sitemap, or normal crawler access.

### Phase 6: Configure S3 paths and CloudFront routing

1. Deploy prerendered pages using directory-style output such as
   `/about/index.html`.
2. Add a CloudFront Function that internally maps extensionless page requests
   to their generated `index.html` objects.
3. Choose one trailing-slash policy and enforce it consistently.
4. Do not route unknown pages to the home document.
5. Redirect the noncanonical hostname to
   `https://www.mcadamsdevelopment.com`.

### Phase 7: Harden S3 and CloudFront

1. Replace the public S3 website origin with the S3 REST origin.
2. Protect the origin with CloudFront Origin Access Control.
3. Block public bucket access.
4. Remove the current 403/404-to-200 SPA fallback.
5. Serve the generated 404 document with HTTP 404.
6. Retain HTTPS redirection and the current TLS minimum.
7. Add appropriate security response headers.
8. Use current managed cache and origin-request policies.

This hardening can follow the prerender launch if separating it lowers rollout
risk, but the soft-404 behavior must be corrected as part of the crawlability
work.

### Phase 8: Caching and deployment

1. Cache hashed JS, CSS, images, and fonts for one year with `immutable`.
2. Give HTML a short CDN revalidation window.
3. Give the sitemap, robots file, `llms.txt`, redirects, and 404 document short
   or moderate TTLs.
4. Upload immutable assets before HTML.
5. Invalidate mutable documents rather than the entire distribution.
6. Retain old hashed assets for a safe overlap period.

### Phase 9: Essential performance work for this release

The site is currently small and image-light, so a broad performance project is
not critical to achieving crawlability. Only low-cost, architecture-adjacent
work should be included now:

1. Use the route-level code splitting supplied by React Router Framework Mode.
2. Preserve Vite's hashed production assets and CloudFront compression.
3. Assign the cache policies described in Phase 8.
4. Remove clearly unused starter assets and dependencies encountered during
   migration.
5. Run one representative production Lighthouse check and record a baseline.
6. Prevent regressions by setting generous initial bundle and page-weight
   budgets rather than undertaking premature micro-optimization.

Font migration, responsive-image infrastructure, advanced analytics deferral,
strict Core Web Vitals budgets, and other broader optimization work are
deferred to the backlog until page weight or field measurements justify them.

### Phase 10: CI/CD and validation

Create an automated pipeline:

```text
checkout
-> install pinned Node
-> npm ci
-> lint and type-check
-> build and prerender
-> validate generated HTML
-> verify sitemap/prerender parity
-> test internal links and status codes
-> deploy immutable assets
-> deploy HTML and crawler resources
-> invalidate mutable CloudFront paths
-> run production smoke tests
```

Use short-lived AWS identity federation rather than stored long-lived AWS
access keys.

Automated checks should confirm:

- Every indexable route has generated HTML.
- Every generated indexable route appears in the sitemap.
- Every sitemap URL returns 200.
- Unknown paths return 404.
- Required metadata and valid JSON-LD exist in raw HTML.
- Canonicals use HTTPS and the selected hostname.
- Internal links resolve.
- Social images return the expected status and MIME type.
- `robots.txt`, `sitemap.xml`, and `llms.txt` are present and valid.

### Phase 11: Documentation and contributor workflow

Update the root `README.md` as part of the implementation, not as a later
cleanup task. Document:

1. The prerendered architecture and why it is used.
2. Supported Node/npm versions and local setup.
3. Development, validation, build, preview, and deployment commands.
4. The route/content registry and metadata model.
5. How sitemap and `llms.txt` generation works.
6. S3 output structure and CloudFront routing assumptions.
7. Cache-header and invalidation behavior.
8. How to add a landing page, solution page, blog article, or case study.
9. Required metadata, social image, structured data, and modification-date
   fields.
10. How to verify that a new page is prerendered and included in the sitemap.
11. Troubleshooting guidance for hydration, missing generated routes, and
    CloudFront cache behavior.

The future landing-page workflow should be explicit:

```text
add content record
-> add page-specific presentation only if needed
-> build enumerates route
-> page is prerendered
-> metadata and JSON-LD are emitted
-> sitemap and llms.txt are updated
-> CI validates the result
```

### Phase 12: Launch and monitoring

1. Deploy to a staging distribution.
2. Crawl it with JavaScript disabled.
3. Validate representative pages with search, structured-data, and social
   preview tools.
4. Deploy production and resubmit the sitemap.
5. Monitor indexing, 404s, redirects, hydration errors, bundle size, and Core
   Web Vitals.
6. Keep a tested rollback build.

## Definition of done

- Public routes return meaningful, route-specific HTML without JavaScript.
- Titles, canonicals, social metadata, and JSON-LD are in the raw response.
- Valid routes return 200 and unknown routes return 404.
- The sitemap is generated from the same source as prerendering.
- `robots.txt`, `sitemap.xml`, and `llms.txt` are deployed and validated.
- S3 and CloudFront deliver the generated route structure correctly.
- Client navigation and the contact form continue to work.
- CI verifies the generated site before deployment.
- The README explains the architecture and future page-authoring workflow.


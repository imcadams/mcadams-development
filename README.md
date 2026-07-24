# McAdams Development website

The McAdams Development marketing site is a React, TypeScript, and Vite
application statically prerendered with React Router Framework Mode. The build
generates complete HTML for every public route, then React hydrates it in the
browser for normal client-side navigation.

The production output is designed for AWS S3 behind CloudFront. No runtime
Node server is required.

## Requirements

- Node.js 22
- npm 10 or later

## Local development

```powershell
npm ci
npm run dev
```

The application package is in `client`. Equivalent package-level commands can
be run from that directory.

## Verification and production build

```powershell
npm run check
```

This runs linting, TypeScript validation, the static prerender build, and
validation of generated HTML, sitemap, robots file, and `llms.txt`.

The deployment artifact is `client/build/client`:

```text
build/client/
├── index.html
├── about/index.html
├── services/index.html
├── contact/index.html
├── privacy-policy/index.html
├── assets/
├── robots.txt
├── sitemap.xml
└── llms.txt
```

## Routes, metadata, sitemap, and llms.txt

`client/content/site-pages.json` is the source of truth for current public
pages. It supplies the canonical path, title, description, schema type, and
modification date. The same data drives:

- React Router prerender paths
- Route metadata and JSON-LD
- `sitemap.xml`
- `llms.txt`
- Build validation

Do not hand-edit generated crawler resources in `build/client`.

## Adding a landing page

1. Add the page content and route module under `client/src`.
2. Add its path, title, description, schema type, and modification date to
   `client/content/site-pages.json`.
3. Register the route in `client/src/routes.ts`.
4. Use `pageMeta(getSitePage('/your-path'))` in the route module.
5. Run `npm run check` and confirm the page, sitemap entry, and `llms.txt`
   entry are generated.

Solution pages, blog articles, and case studies should follow this workflow.
When content becomes numerous, add a content-derived route enumerator rather
than introducing another manually maintained route list.

## AWS deployment

GitHub Actions verifies each change and can deploy from `master`. Configure the
following GitHub secrets before enabling production deployment:

- `AWS_DEPLOY_ROLE_ARN`
- `AWS_S3_BUCKET`
- `AWS_CLOUDFRONT_DISTRIBUTION_ID`

The role must use GitHub OIDC and be limited to the target bucket and
distribution. See [AWS deployment notes](aws-config/README.md) for the required
CloudFront Function, private-origin migration, cache policy, and real-404
configuration.

## Cache behavior

- Hashed assets are immutable for one year.
- HTML receives short CDN revalidation.
- `robots.txt`, `sitemap.xml`, and `llms.txt` receive short CDN caching.

The deployment uploads immutable assets before HTML and invalidates only mutable
documents.

## Troubleshooting

- A missing direct route usually means its generated `index.html` is absent or
  the CloudFront Function is not rewriting the extensionless request.
- If old page content remains after a deployment, verify CloudFront invalidation
  and the HTML cache header.
- If metadata is absent from raw HTML, run `npm run validate:build`; do not rely
  on browser DevTools after hydration.

# McAdams Development Website Specification

## Project Overview
- **Company**: McAdams Development
- **Type**: Web Development Consultancy Website
- **Target**: Startups (MVP) + Mid-size companies (Digital Transformation)
- **Tech Stack**: React 18 + TypeScript + React Router Framework Mode + Vite + Tailwind CSS
- **Deployment**: Statically prerendered S3 site behind CloudFront

## Brand Guidelines
- **Primary Color**: #1e40af (blue-700)
- **Secondary Color**: #059669 (emerald-600)
- **Accent Color**: #ea580c (orange-600)
- **Typography**: Inter font family
- **Style**: Modern minimalist with strategic gradients

## Services & Pricing
1. Website Development - Starting at $2,500
2. Web Application Development - Starting at $8,000
3. Mobile App Development - Starting at $15,000
4. Cloud Migration Services - Contact for quote
5. DevOps Consulting - Contact for quote
6. UI/UX Design - Starting at $3,000

## Site Architecture
- Home
- Services (individual pages for each service)
- Portfolio
- About
- Contact
- Future: /es/ and /pt/ for bilingual expansion

## Current deployed architecture

Every public route is prerendered during `npm run check` and delivered from the
S3 bucket `mcadamsdevelopment.com` through CloudFront distribution
`E98W2XOCHJ9W5`; no runtime Node server is used. The shared page registry drives
route metadata, JSON-LD, sitemap entries, `llms.txt`, prerendering, and build
validation. Current routes include the HVAC AI receptionist solution page at
`/solutions/hvac-ai-receptionist`.

`www.mcadamsdevelopment.com` is the canonical hostname. A CloudFront
viewer-request function redirects the apex hostname to `www` while preserving
the path and query string, then maps extensionless routes to their generated
static files. The normal website deployment uploads site assets and invalidates
CloudFront; it does not publish CloudFront infrastructure.

## Contact service boundary

The static site contains only the public `VITE_CONTACT_API_URL` and
`VITE_TURNSTILE_SITE_KEY` values. It submits the visitor fields, solution
attribution, Turnstile token, honeypot value, and form-start timestamp to the
backend-owned `POST /contact` endpoint.

The separate `imcadams/email-service` repository owns API Gateway, Lambda,
Secrets Manager access, server-side Turnstile verification, SES delivery,
validation, and throttling. The legacy browser API-key flow and `/email`
endpoint have been retired. No email credential, API key, or Turnstile secret
belongs in the website repository or a `VITE_` variable.

## Delivery controls

Every website pull request runs `npm ci` and `npm run check`, including the
production prerender build and generated-resource validation. The same check
runs before a `master` deployment uploads files. Deployment uses GitHub OIDC
with the scoped `GitHubActionsMcAdamsDevelopmentDeploy` role; no stored AWS
access keys or GitHub secrets are used.

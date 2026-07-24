# AWS deployment configuration

The React Router static build is written to `client/build/client` and should be
served by CloudFront from S3.

## Required distribution changes

1. Create or reuse a CloudFront Function from `cloudfront-function.js` and
   associate it with the viewer-request event on the default behavior.
2. Set `www.mcadamsdevelopment.com` as the canonical host in the function.
3. Change the origin from the S3 website endpoint to the bucket REST endpoint.
4. Create an Origin Access Control, attach it to that origin, and block all
   public access on the bucket.
5. Replace the public bucket policy with a policy that allows `s3:GetObject`
   only for this CloudFront distribution.
6. Remove the custom 403/404 mappings to `index.html`; configure a generated
   `/404.html` response with status 404 instead.
7. Attach managed compression and cache policies, then add a response headers
   policy after validating it in report-only mode.

The function maps `/about` to `/about/index.html`, redirects the apex hostname
to `www`, and normalizes trailing slashes. It deliberately does not map unknown
routes to the home page; S3/CloudFront can return a real 404 for them.

## Cache headers

The deployment workflow assigns:

- Hashed assets: `public,max-age=31536000,immutable`
- HTML: `public,max-age=0,s-maxage=300,stale-while-revalidate=86400`
- `robots.txt`, `sitemap.xml`, `llms.txt`, and `404.html`:
  `public,max-age=0,s-maxage=300`

Deploy immutable assets before HTML and invalidate only mutable documents.

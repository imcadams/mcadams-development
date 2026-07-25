# HVAC AI Receptionist and Contact Spam Protection Plan

## Decision summary

Implement the HVAC AI receptionist page as the first instance of a reusable,
data-driven solution-page pattern. Continue using React Router Framework Mode,
static prerendering, S3, and CloudFront. The page must be fully rendered at
build time and participate in the existing metadata, sitemap, `llms.txt`, and
build-validation workflows.

Protect the contact form with Cloudflare Turnstile, verified by the existing
contact backend before any email is sent. Add a honeypot and basic request
throttling as complementary controls. Do not add runtime rendering or change
the website hosting model.

The contact API is implemented in the separate `imcadams/email-service`
repository. Frontend changes must be deployed only after its secure
`POST /contact` endpoint is available.

## Implementation status — July 2026

The target architecture in this document is deployed. The HVAC AI receptionist
route is statically prerendered and included in the generated metadata,
sitemap, and `llms.txt` workflows. The Contact page sends its public payload,
Turnstile token, honeypot, and elapsed-time signal to the separate
`imcadams/email-service` backend.

That backend now provides public `POST /contact`, enforces the bounded request
schema and 32 KiB body limit, applies 2 requests/second with burst 5
throttling, verifies Turnstile with a five-minute cached Secrets Manager value
and a three-second Siteverify timeout, and sends SES mail only after
verification. It logs outcome codes and request IDs without form data. The
retired `/email` route, browser API key, API key resource, and usage plan are
removed.

Production uses `www.mcadamsdevelopment.com` as the canonical hostname. A
CloudFront viewer-request function redirects the apex hostname to `www` before
the Contact page or Turnstile widget loads; verification therefore requires the
`www` hostname and action `contact`.

Pull requests run the website build/validation workflow before merge, and the
backend runs Lambda and CDK tests. Both production workflows deploy only after
their checks pass. The remaining operational work is the one-week monitoring
window for Lambda errors, API Gateway 4xx/5xx/throttles, SES sends, and
Turnstile rejection outcomes.

## Why this approach

### Solution-page architecture

The site is expected to add multiple industry-specific landing pages. A shared
solution template plus typed content records keeps layout, accessibility,
metadata, structured data, and calls to action consistent without copying an
entire React component for every industry.

Static prerendering remains the right rendering model:

- It produces crawler-readable HTML and route-specific metadata.
- It requires no Node runtime, server-side rendering service, or ISR
  infrastructure.
- It preserves the current React and Vite development experience.
- Adding a solution page remains a build-time content operation.

### Spam-protection architecture

Cloudflare Turnstile is the recommended challenge provider because it:

- can be used without moving DNS or CDN traffic to Cloudflare;
- has a free plan suitable for a small-business contact form;
- generally presents less user friction than traditional image challenges;
- supports explicit React integration, test keys, hostname restrictions, and
  server-side token validation.

Turnstile is only effective when the backend verifies each token with
Cloudflare's Siteverify API. Tokens are short-lived and single-use. The
Turnstile secret must never be sent to or bundled into the browser.

Every `VITE_` variable is compiled into public client assets. The legacy
browser API key must remain retired; the public contact endpoint performs
validation and abuse controls on the server.

## Scope

### Included

- `/solutions/hvac-ai-receptionist`
- A reusable solution-page component and content model
- Internal links to make the page discoverable from the rest of the site
- Page-specific metadata and structured data
- Sitemap, `llms.txt`, prerender, and build-validation coverage
- Contact-form preselection for visitors arriving from the HVAC page
- Turnstile client integration
- Server-side Turnstile verification requirements
- Honeypot, input validation, request limits, and basic throttling
- Accessible form success, failure, and retry states
- Environment, deployment, test, privacy, and contributor documentation

### Deferred

- Runtime SSR, ISR, or a CMS
- AWS WAF CAPTCHA
- Per-IP persistence using DynamoDB or another new datastore
- Advanced lead scoring or CRM integration
- A separate social image for every solution page if the existing default
  image is acceptable for the first release
- Site-wide performance work already listed in `docs/backlog.md`
- RSS or Atom feeds

## Required product inputs

Copy must not invent capabilities, integrations, pricing, results, or customer
claims. Before final content is approved, confirm:

1. The exact product or service name.
2. The primary buyer and service area.
3. Supported call handling, scheduling, escalation, and after-hours behavior.
4. Supported HVAC software, calendar, phone, or CRM integrations.
5. Whether bilingual support is offered.
6. Pricing or the approved replacement for pricing.
7. Any measurable claims and the evidence supporting them.
8. The primary CTA: book a demo, request a consultation, or call now.
9. Whether testimonials, customer logos, or case-study claims are approved.

If these inputs are unavailable during implementation, use accurate,
non-quantified copy and omit unsupported integration, pricing, and performance
claims.

## Target architecture

```text
solution content record
        |
        +--> shared SolutionPage component
        +--> /solutions/:slug route
        +--> prerender path
        +--> title, canonical, Open Graph, and JSON-LD
        +--> sitemap.xml
        +--> llms.txt
        +--> build validation

contact form
        |
        +--> Turnstile browser token
        +--> honeypot and elapsed-time signals
        +--> POST /contact
                    |
                    +--> validate request shape and limits
                    +--> verify Turnstile token server-side
                    +--> apply throttling/abuse rules
                    +--> construct trusted email fields
                    +--> send email
```

## Implementation plan

### Phase 0: Secure the current contact boundary

1. Use the `imcadams/email-service` repository and its CDK stack as the
   backend source of truth.
2. Determine whether the existing endpoint is API Gateway and Lambda or
   another service.
3. Revoke the legacy API Gateway key because it was included in browser
   bundles.
4. Remove the requirement for a client-supplied API key from the contact
   endpoint.
5. Confirm that the backend can make outbound HTTPS calls to Turnstile's
   Siteverify endpoint.
6. Define production and local-development origins for a strict CORS
   allowlist.

Backend ownership is the only implementation dependency that cannot be
resolved from this repository.

### Phase 1: Establish the reusable solution content model

1. Add a typed solution content record with at least:
   - `slug`
   - page title and meta description
   - short value proposition
   - audience/industry
   - problem statements
   - benefits
   - feature/capability groups
   - how-it-works steps
   - approved integrations
   - visible FAQs
   - primary and secondary CTA labels/targets
   - Open Graph image override, when present
   - structured-data service name and description
   - `lastModified`
2. Add the HVAC record as the first solution.
3. Keep the canonical path derived from the slug:
   `/solutions/hvac-ai-receptionist`.
4. Ensure the solution records feed the same public-page registry used by
   prerendering and crawler-resource generation. Do not introduce a second
   manually maintained list of solution URLs.
5. Fail the build for duplicate slugs, duplicate canonical paths, missing
   metadata, or required empty sections.

For the first release, repository-managed TypeScript or JSON content is
preferable to a CMS. Revisit a CMS only when non-developer authorship or
editorial previews become a real requirement.

### Phase 2: Build the shared solution-page presentation

Create a semantic, responsive `SolutionPage` presentation that can render
future HVAC, plumbing, roofing, restoration, and dental variants from content.
The initial page should contain:

1. A single, specific H1 and concise hero proposition.
2. A primary CTA to the contact form and a secondary phone CTA.
3. A clear description of the missed-call or front-desk problem.
4. Benefits expressed without unsupported guarantees.
5. A capabilities section using semantic headings and lists.
6. A short "how it works" section.
7. Integration details only when confirmed.
8. Visible FAQs based on genuine customer questions.
9. A final consultation/demo CTA.
10. Breadcrumb navigation.

Prefer real HTML text, headings, lists, links, and buttons. Do not place
important marketing copy only in images, animated canvases, or client-only
components.

### Phase 3: Register and internally link the route

1. Add a solution route capable of resolving content by slug.
2. Add the HVAC canonical path to the prerender inputs through the shared
   content registry.
3. Return the existing real 404 route for unknown solution slugs.
4. Add a discoverable link from the most relevant existing page:
   - add a Solutions entry or menu in the site navigation when there is more
     than one solution;
   - for the first solution, add a prominent link from `/services` and a
     Solutions group in the footer.
5. Use normal React Router links so client navigation and static discovery both
   work.
6. Point the primary CTA to
   `/contact?solution=hvac-ai-receptionist`.
7. Teach the contact page to validate that query parameter against known
   solution slugs and preselect the matching service interest. Ignore unknown
   values rather than reflecting them into the page.

### Phase 4: Add page metadata and structured data

1. Generate a unique title, description, canonical URL, Open Graph URL, and
   Twitter/X metadata for the HVAC page.
2. Use the existing default social image initially, or add a dedicated
   1200-by-630 image if approved creative is available.
3. Extend the JSON-LD model to emit:
   - the existing `Organization` and `WebSite` entities;
   - a `WebPage` entity for the route;
   - a `Service` entity describing the visible HVAC AI receptionist offering;
   - a `BreadcrumbList`;
   - `FAQPage` only when every question and answer is visibly present.
4. Keep structured-data statements identical in substance to visible copy.
5. Add the new route to `sitemap.xml` and `llms.txt` through generation, not
   hand editing.

### Phase 5: Replace the contact API contract

Use a purpose-specific public endpoint such as `POST /contact`. The browser
should submit:

```text
name
email
phone
serviceInterest
budget
description
sourceSolution
turnstileToken
website          # honeypot; expected to be empty
formStartedAt    # coarse anti-automation signal
```

The browser must not control the recipient address, email subject, sender
identity, or any credential. The backend should:

1. Parse and validate the request with an explicit schema.
2. Reject oversized payloads before email processing.
3. Normalize and validate email and phone values.
4. Allow only known enum values for service, budget, and source solution.
5. Silently discard a filled honeypot while returning a generic accepted
   response.
6. Reject implausibly fast submissions using a conservative threshold that
   does not interfere with password managers or assistive technology.
7. Verify the Turnstile token before sending email.
8. Construct the recipient, subject, and message template from trusted
   server-side values.
9. Escape user content appropriately for the selected plain-text or HTML email
   format.
10. Log outcome codes and request IDs without logging full message content,
    Turnstile tokens, email addresses, or phone numbers.

Use a neutral success response so the endpoint does not reveal delivery
details. Return explicit 400/422 responses for correctable validation or
challenge failures and 429 for throttling.

### Phase 6: Integrate Turnstile in React

1. Create separate Turnstile widgets/keys for production and non-production.
2. Restrict the production widget to the canonical production hostname.
3. Expose only the public site key to the client, for example
   `VITE_TURNSTILE_SITE_KEY`.
4. Store the secret only in the backend's secret management or encrypted
   runtime configuration.
5. Add a reusable React component that:
   - loads the Turnstile script only where the form is rendered;
   - explicitly renders and cleans up the widget;
   - captures success, expiry, error, and unsupported-browser callbacks;
   - supplies action `contact`;
   - can reset after expiry or a rejected submission.
6. Disable submission until the client form is valid and a current token is
   available.
7. Send the token with the contact payload.
8. Reset the widget after every submission attempt because tokens are
   single-use.
9. Provide an accessible message and retry path when the challenge cannot
   load; retain the phone and email links as alternative contact methods.

Use Cloudflare's published test keys in automated/local tests rather than
production credentials.

### Phase 7: Verify Turnstile in the backend

For each otherwise valid contact request:

1. Send the token and secret to
   `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
2. Apply a short outbound timeout.
3. Require `success: true`.
4. Verify the returned hostname matches an allowed hostname.
5. Verify the action equals `contact`.
6. Treat missing, expired, duplicate, malformed, and failed tokens as denied.
7. Do not send email if verification is unavailable or unsuccessful.
8. Return a retryable, user-safe error without exposing provider or secret
   details.
9. Record aggregate validation successes/failures for abuse monitoring.

### Phase 8: Add proportionate abuse and cost controls

Turnstile should be the primary bot control. Add these low-complexity layers:

1. Configure a conservative API Gateway or equivalent endpoint-level rate and
   burst throttle.
2. Limit request body size and reject unexpected content types.
3. Use the honeypot and elapsed-time signal.
4. Add a CloudWatch or equivalent alarm for sudden request or email volume.
5. Add a daily email-send budget/alarm where the email provider supports it.

API Gateway throttles are best-effort and are not a strict per-IP security
control. Add an AWS WAF rate-based rule or a small server-side per-IP store
only if production metrics show continued abuse. This avoids unnecessary cost
and infrastructure for the site's current scale.

### Phase 9: Improve contact-form behavior

1. Replace `alert()` calls with inline, accessible status messages using an
   `aria-live` region.
2. Preserve entered values after recoverable network, validation, or
   Turnstile errors.
3. Clear the form only after the backend accepts the request.
4. Prevent duplicate submission while a request is in flight.
5. Give validation errors stable associations with their fields.
6. Update the service-interest choices to include AI receptionist solutions.
7. Capture the HVAC page as attribution without trusting arbitrary query text.
8. Keep the direct phone and email contact options visible.

### Phase 10: Privacy, security headers, and configuration

1. Update the privacy policy to disclose the challenge provider and the
   processing required to prevent abuse.
2. If a Content Security Policy is enabled, permit only the minimum Turnstile
   script, frame, and connection origins required by current provider
   guidance.
3. Add `.env.example` entries for public frontend configuration only.
4. Keep the legacy browser API key out of code, type declarations, README
   examples, deployment secrets, and build configuration.
5. Document the backend-only secret separately without including its value.
6. Ensure production logs and analytics do not capture form content or
   challenge tokens.

### Phase 11: Tests and automated validation

Add coverage at four levels.

#### Content and build tests

- HVAC content passes the content schema.
- The route is prerendered to
  `build/client/solutions/hvac-ai-receptionist/index.html`.
- Raw HTML contains the H1 and meaningful body copy.
- Unique title, description, canonical, Open Graph fields, and JSON-LD exist.
- The canonical URL appears exactly once in the sitemap and in `llms.txt`.
- Internal links resolve.

#### Frontend tests

- Valid form plus valid Turnstile token submits the expected public payload.
- Missing, expired, and errored challenges prevent submission with an
  accessible message.
- A failed request retains form values and resets the widget.
- A successful request clears the form and announces success.
- The approved solution query parameter preselects attribution.
- An unknown solution query parameter is ignored.

#### Backend tests

- Valid input and a verified token result in one email.
- Invalid, missing, expired, duplicate, wrong-hostname, and wrong-action tokens
  result in no email.
- Filled honeypots result in no email.
- Invalid enums, oversized payloads, and malformed fields are rejected.
- Browser-supplied recipient or subject fields are ignored/rejected.
- Rate-limit behavior returns 429.
- Logs contain request IDs and outcomes but no sensitive form body.

#### Production smoke tests

- Direct navigation returns 200 and rendered HVAC content.
- Unknown solution slugs return 404.
- Turnstile succeeds on the canonical hostname.
- One test submission produces one correctly formatted email.
- The form remains usable on mobile and by keyboard.
- Sitemap, `llms.txt`, canonical tags, and social preview metadata are live
  after CloudFront invalidation.

### Phase 12: Deployment sequence

1. Create non-production and production Turnstile widgets.
2. Rotate the existing exposed contact API key.
3. Deploy the backward-compatible backend `/contact` endpoint with
   server-side secret configuration, verification, validation, and throttling.
4. Test the endpoint with Turnstile test keys and direct API requests.
5. Deploy the static frontend with the public production site key.
6. Run production smoke tests.
7. Remove the old `/email` path and client API-key configuration after the new
   flow is confirmed.
8. Monitor challenge failures, request counts, throttles, and email volume for
   at least the first week.

Deploying the backend first avoids a period in which the new frontend points
to an unavailable endpoint. Keep rollback artifacts for both sides.

### Phase 13: Documentation

Update the root README and backend documentation with:

- how to add another solution content record;
- the shared solution-page field requirements;
- how prerendering, sitemap, `llms.txt`, and metadata are derived;
- local Turnstile testing;
- public versus secret environment variables;
- the contact API contract and error responses;
- deployment order and smoke-test steps;
- key rotation and incident-response notes.

Also update the example build tree in the root README to include the generated
HVAC route.

## File-level change map

Expected frontend changes:

- `client/src/routes.ts`: register the parameterized or generated solution
  route.
- `client/src/pages/`: add the shared solution presentation.
- `client/src/route-modules/`: add the solution route module.
- `client/src/content/` and/or `client/content/`: add the typed solution record
  and feed it into the public-page registry.
- `client/src/content/seo.ts`: support `Service`, breadcrumbs, optional FAQs,
  and per-page social images.
- `client/src/pages/Contact.tsx`: adopt the new API contract, attribution,
  Turnstile, honeypot, and accessible state handling.
- `client/src/components/`: add the Turnstile wrapper and solution navigation
  where appropriate.
- `client/src/vite-env.d.ts`: replace the exposed email API key type with the
  public Turnstile site key and API URL types.
- `client/scripts/validate-build.mjs`: validate the new raw HTML, discovery
  entries, and structured data.
- `client/content/site-pages.json`: either include the generated solution
  metadata or be replaced by an aggregated content registry without duplicate
  path maintenance.
- `README.md` and `client/README.md`: document the current architecture,
  configuration, and workflow; remove obsolete secret-key guidance.
- `client/src/pages/PrivacyPolicy.tsx`: add the approved spam-prevention
  disclosure.

Expected backend changes, in its owning repository:

- public `POST /contact` handler;
- request schema and body-size limits;
- Turnstile Siteverify client;
- secret storage and environment configuration;
- trusted email template;
- CORS allowlist and throttling;
- privacy-safe structured logs, metrics, and alarms;
- unit and integration tests.

## Alternatives ranked

1. **Cloudflare Turnstile — recommended.** Best balance of low friction, cost,
   maintainability, and compatibility with the existing AWS-hosted static site.
2. **hCaptcha — viable fallback.** Appropriate if provider policy, regional
   availability, or organizational preference rules out Turnstile; still
   requires server verification and similar frontend/backend work.
3. **Google reCAPTCHA — viable but not preferred.** Mature and widely
   supported, but introduces a larger Google privacy/vendor dependency and can
   have more visible challenge friction depending on configuration.
4. **AWS WAF CAPTCHA — situational.** Keeps abuse controls within AWS but adds
   WAF cost and distribution/API configuration that is disproportionate for
   the current low-volume contact form.
5. **Honeypot alone — insufficient.** Useful as a cheap secondary signal but
   easy for targeted bots to bypass.

## Definition of done

- `/solutions/hvac-ai-receptionist` returns meaningful prerendered HTML.
- The page has approved copy, a single H1, internal links, CTA attribution, and
  a responsive accessible layout.
- Its metadata and accurate structured data exist in raw HTML.
- It is generated into the sitemap and `llms.txt` from the shared content
  source.
- The solution-page pattern can add another industry page primarily through a
  content record.
- No secret or API key used to authorize email sending appears in client code
  or built assets.
- Every accepted contact request has a valid, server-verified Turnstile token.
- Invalid challenges, honeypots, malformed payloads, and throttled requests do
  not send email.
- Form errors and success states are accessible and do not discard user input
  unnecessarily.
- Automated build, frontend, backend, and production smoke tests pass.
- README and backend documentation explain the landing-page and contact-form
  workflows.

## Provider references

- [Cloudflare Turnstile overview and setup](https://developers.cloudflare.com/turnstile/get-started/)
- [Cloudflare Turnstile client-side rendering](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
- [Cloudflare Turnstile server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Cloudflare Turnstile plans](https://developers.cloudflare.com/turnstile/plans/)
- [AWS API Gateway throttling](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html)
- [AWS API Gateway usage plans and API keys](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html)

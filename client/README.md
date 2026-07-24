# Client application

The client is a React, TypeScript, and Vite application statically prerendered
with React Router Framework Mode. Run the normal commands from the repository
root:

```powershell
npm ci
npm run dev
npm run check
```

## Public environment variables

Create a local `client/.env` file only when testing the contact integration:

```text
VITE_CONTACT_API_URL=https://contact-api.example.com
VITE_TURNSTILE_SITE_KEY=your-public-turnstile-site-key
```

Both values are intentionally public browser configuration. Do not add email
provider keys, AWS credentials, or the Turnstile secret key to any `VITE_`
variable. The backend must verify the Turnstile token and own all email-sending
credentials.

## Adding a solution page

Solution records live in `content/site-pages.json`. A record with a `solution`
object is automatically prerendered, added to the sitemap and `llms.txt`, and
rendered by the shared `/solutions/:slug` route. Run `npm run check` after
adding a record to verify the generated HTML and crawler resources.

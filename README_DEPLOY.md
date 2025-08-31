SPA deep link handling and deployment notes

Problem
-------
Single-page apps (SPA) using client-side routing (React Router) need the server to return index.html for any route so the client router can render the correct page. Without this, directly opening a deep link like /tinko results in a 404 from the server.

Solutions
---------
1) Configure your host to rewrite all requests to index.html (recommended):
   - Netlify: include `public/_redirects` with `/* /index.html 200`.
   - Vercel: include a `vercel.json` with route rewrite to `/index.html`.
   - Any static host with custom rewrites: point unknown routes to `/index.html`.

2) GitHub Pages fallback: add `public/404.html` that redirects to `/` — limited but works for many cases.

3) Router fallback (no server changes): switch to `HashRouter` in React. URLs will be `/#/tinko` which avoids server rewrites.

Verification
------------
- Deploy the site after the above files are present.
- Open a deep link (e.g., https://www.enginuitystem.com/tinko) in a new tab — it should return index.html and render the Tinko route.

If you want, I can:
- Switch the app to `HashRouter` (non-destructive quick change).
- Add serverless functions or a small express redirect server.

Sitemap generation
------------------
After build, a `sitemap.xml` will be generated into `public/sitemap.xml` listing routes for search engines.

- Locally run:

```
# generate sitemap only
node scripts/generate-sitemap.js

# or build and generate
npm run build
```

- Make sure your `SITE_URL` environment variable is set during generation or deployment to customize the domain:

```
SITE_URL=https://www.enginuitystem.com npm run build
```

- Confirm `public/sitemap.xml` is available after deployment at `https://www.enginuitystem.com/sitemap.xml`.

Note: The script uses a static list of routes in `scripts/generate-sitemap.js`. If you have dynamic pages (tutorials, posts), you should extend the script to enumerate those pages at build time (from a JSON file or API).

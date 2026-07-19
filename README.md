# MchongoFasta Web

Angular operations dashboard for jobs, verification, revenue, categories, and platform metrics.

## Local

```bash
npm install
npm start
```

Dev server: `http://localhost:4200`  
API calls go to `/api/*` and are proxied to `http://localhost:3001` (run the backend first).

## Deploy on Vercel

1. Deploy the `backend/` project first and note its URL (e.g. `https://mchongofasta-api.vercel.app`).
2. In `vercel.json`, replace `REPLACE_WITH_YOUR_API.vercel.app` with that host.
3. Create a new Vercel project from this repo.
4. Set **Root Directory** to `web`.
5. Framework preset: **Other** (build/output are already in `vercel.json`).
6. Deploy.

The production app loads dashboard data from the API via same-origin `/api/*` rewrites.

## Build

```bash
npm run build
```

Output: `dist/web/browser`

# MchongoFasta Web

Angular operations dashboard for jobs, verification, revenue, categories, and platform metrics.

Uses the shared blue fintech theme (`#2B6AFF`, Plus Jakarta Sans) while keeping marketplace operations context.

## Local

```bash
npm install
npm start
```

Dev server: `http://localhost:4200`  
API calls go to `/api/*` and are proxied to `http://localhost:3001` (run the backend first).

## Deploy on Vercel

API: `https://mchongo-fasta-backend.vercel.app`

1. Create a Vercel project from this repo.
2. Framework preset: **Other** (build/output are already in `vercel.json`).
3. Deploy.

Production builds call the live API. `vercel.json` also rewrites `/api/*` to that backend.

## Build

```bash
npm run build
```

Output: `dist/web/browser`

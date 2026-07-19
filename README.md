# MchongoFasta Web

Public marketing landing page for the Tanzania daily-work marketplace.

Blue/white gradient hero, product story, worker & employer paths, funding/revenue model, and a Log in modal. Live jobs preview pulls from the API when available.

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

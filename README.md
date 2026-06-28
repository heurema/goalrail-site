# Goalrail website

A minimal marketing + docs site for [Goalrail](https://github.com/heurema/goalrail),
built with Next.js (App Router).

## Develop

This project uses [Bun](https://bun.sh) as its package manager and runner.

```bash
bun install
bun run dev      # http://localhost:3000
```

## Build

```bash
bun run build
bun run start
```

## Before Pushing to Github

> Note: This will help maintain good developer hygiene

```bash
bun run lint
bun run strip-lock-proxy && bun run strip-lock-proxy:check
bun run lint:links
```

## Structure

- `app/page.js` — redirects to `/en`.
- `app/en/*` — English marketing, quickstart, docs, FAQ, and API routes.
- `app/ru/*` — Russian marketing, quickstart, docs, FAQ, and API routes.
- `components/` — nav, footer, copyable command, quickstart sidebar, icons, links.
- `public/images/` — brand assets, architecture diagrams, product screenshots, and social cards.

Edit the GitHub / Telegram / package links in `components/links.js`.

## Deploy

The public website is deployed from this repository through the infra GitOps
entrypoint in `/Users/vi/personal/standalone/infra`. Do not use Vercel,
Cloudflare, direct SSH, or app/server deploy flows for this repo unless the
deploy contract is explicitly changed.

Before touching the server, run the local gate:

```bash
bun install --frozen-lockfile
bun run strip-lock-proxy:check
bun run lint
bun run lint:links
bun run test:theme
bun run test:go-routes
bun run build
```

After the site commit is landed and pushed to `origin/main`, deploy from infra:

```bash
cd /Users/vi/personal/standalone/infra
scripts/deploy-goalrail-site.sh --commit-push --reconcile
```

The deploy script updates `GOALRAIL_SITE_REF`, validates Kubernetes manifests,
commits and pushes the infra GitOps change, reconciles Flux, and verifies the
deployed ref and rollout. Agents must follow
[`.agents/rules/site-deploy-rule.mdc`](.agents/rules/site-deploy-rule.mdc) and
smoke test `https://goalrail.dev/`, `/en`, `/ru`, and `/llms.txt` after deploy.

Application builds are not part of this website deploy. Build desktop/iOS/app
artifacts from `heurema/goalrail` using that repository's app build instructions;
do not bump app/package versions unless the release task explicitly asks for it.

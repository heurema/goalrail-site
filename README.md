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

Push to a Git repo and import it into Vercel — it auto-detects Next.js, no
configuration needed.

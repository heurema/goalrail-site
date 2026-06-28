"use client";

// Scalar's stylesheet. The component imports this internally, but that
// side-effect import is invisible to Next's CSS pipeline when the
// component is pulled in through a next/dynamic `.then()` factory
// (below) — so the styles never get bundled and the reference renders
// unstyled. Importing it explicitly here, in a Client Component that's
// statically reachable from the /reference route, makes Next emit it
// into that route's CSS chunk (and only that route's).
import "@scalar/api-reference-react/style.css";

// Scalar API reference, embedded as a client-only island. Scalar's
// renderer is a Vue app under the hood and its SSR path is untested, so
// we load it via next/dynamic with `ssr: false` (allowed here because
// this file is a Client Component). It owns its own three-panel layout
// and endpoint sidebar; the surrounding site chrome (Nav/Footer) comes
// from app/reference/layout.js.
import dynamic from "next/dynamic";

const ApiReferenceReact = dynamic(
  () => import("@scalar/api-reference-react").then((m) => m.ApiReferenceReact),
  { ssr: false },
);

// Map the site's Dracula tokens (app/globals.css) onto Scalar's
// `--scalar-*` variables. Define the same values under Scalar's
// `.light-mode` and `.dark-mode` selectors so its internal mode cannot drift.
const BRAND_CSS = `
.light-mode,
.dark-mode {
  --scalar-color-1: #f8f8f2;
  --scalar-color-2: #cfcfc7;
  --scalar-color-3: #6272a4;
  --scalar-color-accent: #ff79c6;
  --scalar-background-1: #282a36;
  --scalar-background-2: #343746;
  --scalar-background-3: #3b3d4f;
  --scalar-background-accent: #3b2b44;
  --scalar-border-color: #44475a;

  --scalar-sidebar-background-1: #282a36;
  --scalar-sidebar-color-1: #f8f8f2;
  --scalar-sidebar-color-2: #cfcfc7;
  --scalar-sidebar-border-color: #44475a;
  --scalar-sidebar-item-hover-background: #44475a;
  --scalar-sidebar-item-hover-color: #f8f8f2;
  --scalar-sidebar-item-active-background: #3b2b44;
  --scalar-sidebar-color-active: #ff79c6;
  --scalar-sidebar-search-background: #343746;
  --scalar-sidebar-search-border-color: #44475a;
}
.light-mode, .dark-mode {
  --scalar-font: "Satoshi", system-ui, sans-serif;
  --scalar-radius: 10px;
}

/* The sticky "Powered by Scalar" sidebar footer ships with px-3/pb-3
   (12px) but no top padding, so the text sits flush against the scroll
   content above. Add a matching top so it's evenly padded all around. */
.scalar-app .darklight-reference {
  padding-top: 12px;
}
`;

export default function ApiReference() {
  return (
    <ApiReferenceReact
      configuration={{
        // Fetched client-side from the committed static asset
        // (public/openapi.json), kept in sync with the Goalrail repo
        // by the sync-openapi-to-site CI workflow.
        url: "/openapi.json",
        theme: "none",
        layout: "modern",
        // Read-only reference: no live "Try it" client (the server is
        // self-hosted with cookie/proxy auth, so cross-origin requests
        // from a public docs site would mostly fail). Per-language code
        // samples still render. This also hides the auth panel.
        hideTestRequestButton: true,
        // The rest of the site is fixed to the Dracula dark theme, so
        // hide Scalar's toggle to match.
        hideDarkModeToggle: true,
        // Disable Scalar's hosted "Ask AI" agent and the "Generate MCP"
        // install button. Both default to on for local URLs (which is why
        // they appear in local dev), and "Ask AI" ships the OpenAPI doc +
        // the question to Scalar's hosted service — not something we want
        // on a self-hosted, read-only reference.
        agent: { disabled: true },
        mcp: { disabled: true },
        // Hide the "Open API Client" launcher — it opens client.scalar.com
        // with this spec URL (another hosted surface we don't need).
        hideClientButton: true,
        // The "Developer Tools / Configure / Share / Deploy" toolbar
        // defaults to rendering only on local URLs (isLocalUrl), so it
        // would show on localhost dev/preview. The code ships in the
        // bundle regardless — it's runtime-gated, not build-stripped — so
        // force it off everywhere to be explicit.
        showDeveloperTools: "never",
        customCss: BRAND_CSS,
      }}
    />
  );
}

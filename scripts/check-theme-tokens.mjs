import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const globals = readFileSync(join(root, "app/globals.css"), "utf8");
const apiReference = readFileSync(
  join(root, "components/ApiReference.js"),
  "utf8",
);

const requiredGlobals = [
  "color-scheme: dark;",
  "--bg: #282a36;",
  "--fg: #f8f8f2;",
  "--accent: #ff79c6;",
  "--code-bg: #282a36;",
  ".pillar-visual .theme-light-only",
  "display: none;",
  ".pillar-visual .theme-dark-only",
  "display: block;",
];

const requiredScalarTokens = [
  "--scalar-color-1: #f8f8f2;",
  "--scalar-color-accent: #ff79c6;",
  "--scalar-background-1: #282a36;",
  "--scalar-background-accent: #3b2b44;",
  "--scalar-border-color: #44475a;",
];

const missing = [];
for (const token of requiredGlobals) {
  if (!globals.includes(token))
    missing.push(`app/globals.css missing ${token}`);
}
for (const token of requiredScalarTokens) {
  if (!apiReference.includes(token))
    missing.push(`components/ApiReference.js missing ${token}`);
}

if (missing.length > 0) {
  console.error(missing.join("\n"));
  process.exit(1);
}

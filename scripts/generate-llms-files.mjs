import { existsSync, readFileSync, writeFileSync } from "node:fs";

const SITE_URL = "https://goalrail.dev";
const LASTMOD = "2026-06-27";

const locales = [
  {
    id: "en",
    label: "English",
    homepageTitle: "Goalrail",
    homepageDescription: "Product overview and architecture.",
    faqTitle: "FAQ",
    faqDescription: "Common questions.",
    homepageSummary: `# Goalrail

Goalrail is an open-source layer over Claude Code, Codex, Pi, and custom agents. It lets teams switch harnesses without rewriting workflows, govern sessions with policies and OS sandboxing, and collaborate in real time from terminal, web, desktop, mobile, or API interfaces.

Core capabilities:

- Built-in multi-agent workflows for coding orchestration and model debate.
- Custom agents written in YAML with configurable harnesses, models, prompts, skills, tools, and policies.
- Contextual policies for safety, spend caps, model routing, and risk-based escalation.
- OS sandboxing for filesystem, network, environment, and credential boundaries.
- Shared sessions, comments, forks, and multi-device collaboration.
- Deployable shared server with database, authentication, and cloud sandbox host options.`,
    faqSummary: `# FAQ

## What is Goalrail?

Goalrail is an open-source layer for running AI agents behind one interface. It wraps Claude Code, Codex, Pi, and custom YAML agents with a server, UI, sandboxing, policies, and shared session history.

## Which models can I use?

Bring your own API key, Claude or ChatGPT subscription, OpenAI-compatible gateway, Anthropic-compatible gateway, or local model endpoint.

## How do I run my own agent?

Write a YAML file with a prompt and harness, then run \`goalrail run\`. See the custom agent guide.

## Is it ready for production?

No. Goalrail is alpha.`,
  },
  {
    id: "ru",
    label: "Русский",
    homepageTitle: "Goalrail",
    homepageDescription: "Обзор продукта и архитектуры.",
    faqTitle: "FAQ",
    faqDescription: "Частые вопросы.",
    homepageSummary: `# Goalrail

Goalrail - открытый слой над Claude Code, Codex, Pi и вашими собственными агентами. Он позволяет менять harness без переписывания workflow, управлять сессиями через policies и OS sandboxing и работать с одной live session из terminal, web, desktop, mobile или API.

Ключевые возможности:

- Встроенные multi-agent workflows для coding orchestration и model debate.
- Custom agents в YAML: harnesses, models, prompts, skills, tools и policies.
- Контекстные политики для safety, spend caps, model routing и risk-based escalation.
- OS sandboxing для filesystem, network, environment и credential boundaries.
- Shared sessions, comments, forks и multi-device collaboration.
- Общий server с database, authentication и cloud sandbox host options.`,
    faqSummary: `# FAQ

## Что такое Goalrail?

Goalrail - открытый слой для запуска AI-агентов через единый интерфейс. Он оборачивает Claude Code, Codex, Pi и YAML-агентов, добавляя server, UI, sandboxing, policies и shared session history.

## Какие модели можно использовать?

Можно подключать API keys, Claude или ChatGPT subscriptions, OpenAI-compatible gateways, Anthropic-compatible gateways и local model endpoints.

## Как запустить своего агента?

Опишите prompt и harness в YAML, затем выполните \`goalrail run\`. См. руководство по custom agents.

## Можно ли использовать в production?

Пока нет. Goalrail находится в alpha.`,
  },
];

const routeDefs = [
  {
    section: "Quickstart",
    href: "/quickstart/install",
    label: { en: "Install Goalrail", ru: "Установка Goalrail" },
    description: {
      en: "Requirements, installation, credentials, Debby, and the macOS app.",
      ru: "Требования, установка, credentials, Debby и приложение для macOS.",
    },
    priority: "0.9",
  },
  {
    section: "Quickstart",
    href: "/quickstart/coding-agent",
    label: { en: "Tutorial: Coding Agent", ru: "Туториал: coding agent" },
    description: {
      en: "Run Claude Code or Codex through Goalrail with web UI, comments, forks, and policies.",
      ru: "Запуск Claude Code или Codex через Goalrail: web UI, comments, forks и policies.",
    },
    priority: "0.8",
  },
  {
    section: "Quickstart",
    href: "/quickstart/polly",
    label: {
      en: "Tutorial: Multi-Agent Coding",
      ru: "Туториал: несколько агентов",
    },
    description: {
      en: "Run Polly, Goalrail's multi-agent coding orchestrator.",
      ru: "Запуск Polly, многоагентного coding orchestrator в Goalrail.",
    },
    priority: "0.8",
  },
  {
    section: "Quickstart",
    href: "/quickstart/collaborate",
    label: { en: "Tutorial: Collaborate", ru: "Туториал: совместная работа" },
    description: {
      en: "Deploy a shared server, connect devices, share sessions, and run cloud sandbox hosts.",
      ru: "Развертывание общего server, подключение устройств, shared sessions и cloud sandbox hosts.",
    },
    priority: "0.8",
  },
  {
    section: "Quickstart",
    href: "/quickstart/policies",
    label: { en: "Tutorial: Contextual Policies", ru: "Туториал: политики" },
    description: {
      en: "Attach context-aware policies to live sessions.",
      ru: "Подключение context-aware policies к live sessions.",
    },
    priority: "0.8",
  },
  {
    section: "Use",
    href: "/docs/use/coding-agents",
    label: { en: "Coding Agents", ru: "Coding agents" },
    description: {
      en: "Use Goalrail with Claude Code, Codex, and shared agent sessions.",
      ru: "Goalrail поверх Claude Code, Codex и shared agent sessions.",
    },
  },
  {
    section: "Use",
    href: "/docs/use/builtin-agents",
    label: { en: "Built-in Multi-Agent Workflows", ru: "Встроенные workflows" },
    description: {
      en: "Overview of Goalrail's built-in multi-agent workflows.",
      ru: "Обзор встроенных multi-agent workflows в Goalrail.",
    },
  },
  {
    section: "Use",
    href: "/docs/use/builtin-agents/polly",
    label: { en: "Polly", ru: "Polly" },
    description: { en: "Coding orchestrator.", ru: "Coding orchestrator." },
  },
  {
    section: "Use",
    href: "/docs/use/builtin-agents/debby",
    label: { en: "Debby", ru: "Debby" },
    description: { en: "Model debate workflow.", ru: "Model debate workflow." },
  },
  {
    section: "Use",
    href: "/docs/use/custom-agents",
    label: { en: "Custom Agents", ru: "Свои агенты" },
    description: {
      en: "Create custom YAML agents with harnesses, models, prompts, skills, tools, and policies.",
      ru: "Собственные YAML agents с harnesses, models, prompts, skills, tools и policies.",
    },
  },
  {
    section: "Build",
    href: "/docs/build/harnesses",
    label: { en: "Harnesses", ru: "Harnesses" },
    description: {
      en: "Runtime harnesses for agent loops.",
      ru: "Runtime harnesses для agent loops.",
    },
  },
  {
    section: "Build",
    href: "/docs/build/models",
    label: { en: "Models & Credentials", ru: "Модели и доступы" },
    description: {
      en: "Declare models and configure API keys, subscriptions, and gateways.",
      ru: "Модели, API keys, subscriptions и gateways.",
    },
  },
  {
    section: "Build",
    href: "/docs/build/prompts",
    label: { en: "Prompts & Skills", ru: "Промпты и skills" },
    description: {
      en: "Shape agent behavior.",
      ru: "Настройка поведения агента.",
    },
  },
  {
    section: "Build",
    href: "/docs/build/tools",
    label: { en: "MCP & Tools", ru: "MCP и tools" },
    description: {
      en: "Add MCP servers, functions, sub-agents, and inherited tools.",
      ru: "MCP servers, functions, sub-agents и inherited tools.",
    },
  },
  {
    section: "Interfaces",
    href: "/docs/interact/terminal",
    label: { en: "Terminal", ru: "Терминал" },
    description: {
      en: "Start and manage sessions from CLI.",
      ru: "Запуск и управление sessions из CLI.",
    },
  },
  {
    section: "Interfaces",
    href: "/docs/interact/web-ui",
    label: { en: "Web UI", ru: "Веб-интерфейс" },
    description: {
      en: "Files, comments, diffs, multimodal input, and collaboration.",
      ru: "Файлы, comments, diffs, multimodal input и совместная работа.",
    },
  },
  {
    section: "Interfaces",
    href: "/docs/interact/mobile",
    label: { en: "Mobile", ru: "Мобильный доступ" },
    description: {
      en: "Use sessions from a phone.",
      ru: "Работа с sessions с телефона.",
    },
  },
  {
    section: "Interfaces",
    href: "/docs/interact/desktop",
    label: { en: "Desktop App", ru: "Desktop app" },
    description: {
      en: "Install and use the native desktop app.",
      ru: "Установка и подключение native desktop app.",
    },
  },
  {
    section: "Collaboration",
    href: "/docs/collaborate",
    label: { en: "Pair Programming", ru: "Совместная работа" },
    description: {
      en: "Share and fork live sessions.",
      ru: "Публикация ссылок и forks для live sessions.",
    },
  },
  {
    section: "Collaboration",
    href: "/docs/collaborate/auth",
    label: { en: "Auth & SSO", ru: "Auth и SSO" },
    description: {
      en: "Accounts, OIDC SSO, trusted headers, and migration.",
      ru: "Accounts, OIDC SSO, trusted headers и migration.",
    },
  },
  {
    section: "Deploy",
    href: "/docs/deploy/overview",
    label: { en: "Shared Server", ru: "Общий сервер" },
    description: {
      en: "Deploy Goalrail server, runner, UI, and collaboration stack.",
      ru: "Развертывание Goalrail server, runner, UI и collaboration stack.",
    },
  },
  {
    section: "Deploy",
    href: "/docs/deploy/database",
    label: { en: "Database", ru: "База данных" },
    description: {
      en: "Postgres, SQLite, and first boot behavior.",
      ru: "Postgres, SQLite и first boot behavior.",
    },
  },
  {
    section: "Deploy",
    href: "/docs/deploy/cloud-sandbox-host",
    label: { en: "Cloud Sandbox Host", ru: "Cloud sandbox host" },
    description: {
      en: "Configure remote runner containers.",
      ru: "Настройка remote runner containers.",
    },
  },
  {
    section: "Policies",
    href: "/docs/policies/overview",
    label: { en: "Contextual Policies", ru: "Контекстные политики" },
    description: {
      en: "Policy concepts, levels, and configuration.",
      ru: "Понятия, уровни и configuration для policies.",
    },
  },
  {
    section: "Policies",
    href: "/docs/policies/builtin",
    label: { en: "Builtin Policies", ru: "Встроенные политики" },
    description: {
      en: "Safety and cost-control policies.",
      ru: "Safety и cost-control policies.",
    },
  },
  {
    section: "Policies",
    href: "/docs/policies/custom",
    label: { en: "Custom Policies", ru: "Свои политики" },
    description: {
      en: "Write and register custom policy functions.",
      ru: "Собственные policy functions на Python.",
    },
  },
  {
    section: "Policies",
    href: "/docs/policies/os-sandbox",
    label: { en: "OS Sandbox Config", ru: "OS sandbox config" },
    description: {
      en: "Filesystem, network, and environment restrictions.",
      ru: "Filesystem, network и environment restrictions.",
    },
  },
  {
    section: "Policies",
    href: "/docs/omnibox",
    label: { en: "Omnibox", ru: "Omnibox" },
    description: {
      en: "OS-level sandbox overview.",
      ru: "OS-level sandbox overview.",
    },
  },
];

function absolute(href) {
  return `${SITE_URL}${href}`;
}

function localizedHref(locale, href) {
  return `/${locale}${href === "/" ? "" : href}`;
}

function sourceFor(locale, href) {
  return `app/${locale}${href}/page.mdx`;
}

function cleanMdx(sourcePath) {
  if (!existsSync(sourcePath)) return "";
  const source = readFileSync(sourcePath, "utf8");
  const lines = source.split("\n");
  const kept = [];
  let skippingMetadata = false;

  for (const line of lines) {
    if (line.startsWith("import ")) continue;
    if (line.startsWith("export const metadata = pageMeta")) {
      skippingMetadata = true;
      continue;
    }
    if (skippingMetadata) {
      if (line.trim() === ");" || line.trim() === "});") {
        skippingMetadata = false;
      }
      continue;
    }
    kept.push(line);
  }

  return kept
    .join("\n")
    .replace(
      /<InstallCommandTabs \/>/g,
      [
        "```sh",
        "curl -fsSL https://goalrail.dev/install.sh | sh",
        "# or",
        "uv tool install goalrail",
        "# or",
        "pip install goalrail",
        "# or",
        "brew install heurema/tap/goalrail",
        "```",
      ].join("\n"),
    )
    .replace(
      /<MacDownloadButton \/>/g,
      "[Download macOS App](https://goalrail.dev/download/mac)",
    )
    .replace(
      /<ProviderKeyTable \/>/g,
      "Provider credentials can be configured with API keys, subscriptions, or compatible gateways.",
    )
    .replace(
      /<GatewayLogos \/>/g,
      "Supported OpenAI- or Anthropic-compatible gateways include OpenRouter, LiteLLM, Ollama, Azure, vLLM, and similar providers.",
    )
    .replace(/^<ContentTabs[^\n]*>\n?/gm, "")
    .replace(/^<\/ContentTabs>\n?/gm, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/<img\s+([\s\S]*?)\/>/g, (_match, attrs) => {
      const src = attrs.match(/src="([^"]+)"/)?.[1];
      const alt = attrs.match(/alt="([^"]+)"/)?.[1] ?? "";
      return src ? `![${alt}](${src})` : "";
    })
    .replace(/\{" "\}/g, " ")
    .replace(/<Link href="([^"]+)">([^<]+)<\/Link>/g, "[$2]($1)")
    .replace(/<[^>\n]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function buildLlmsTxt() {
  const lines = [
    "# Goalrail",
    "",
    "> Open-source layer for building, governing, and collaborating on AI agent sessions.",
    "",
    `For expanded context, use [llms-full.txt](${absolute("/llms-full.txt")}).`,
    "",
  ];

  for (const locale of locales) {
    lines.push(`## ${locale.label}`, "");
    lines.push(
      `- [${locale.homepageTitle}](${absolute(localizedHref(locale.id, "/"))}): ${locale.homepageDescription}`,
    );
    for (const route of routeDefs) {
      lines.push(
        `- [${route.label[locale.id]}](${absolute(localizedHref(locale.id, route.href))}): ${route.description[locale.id]}`,
      );
    }
    lines.push(
      `- [${locale.faqTitle}](${absolute(localizedHref(locale.id, "/faq"))}): ${locale.faqDescription}`,
      "",
    );
  }

  lines.push(
    "## Project",
    "",
    "- [GitHub repository](https://github.com/heurema/goalrail): Product source code.",
    "- [Telegram](https://t.me/goalrail): Project updates and feedback.",
    `- [Sitemap](${absolute("/sitemap.xml")}): Full public route index.`,
    "",
  );

  return lines.join("\n");
}

function buildLlmsFullTxt() {
  const lines = [
    "# Goalrail Full Documentation",
    "",
    "> Expanded LLM context for Goalrail. Includes English and Russian public documentation.",
    "",
    `Source: ${SITE_URL}`,
    "Generated from: https://github.com/heurema/goalrail-site",
    "",
  ];

  for (const locale of locales) {
    lines.push("---", "", `## ${absolute(localizedHref(locale.id, "/"))}`, "");
    lines.push(locale.homepageSummary, "");
    for (const route of routeDefs) {
      lines.push(
        "---",
        "",
        `## ${absolute(localizedHref(locale.id, route.href))}`,
        "",
        cleanMdx(sourceFor(locale.id, route.href)),
        "",
      );
    }
    lines.push(
      "---",
      "",
      `## ${absolute(localizedHref(locale.id, "/faq"))}`,
      "",
      locale.faqSummary,
      "",
    );
  }

  return lines.join("\n").replace(/\n{4,}/g, "\n\n\n");
}

function buildSitemap() {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    "",
  ];

  for (const locale of locales) {
    const routes = [
      { href: "/", priority: "1.0" },
      ...routeDefs,
      { href: "/faq", priority: "0.6" },
      { href: "/reference", priority: "0.6" },
    ];
    for (const route of routes) {
      const href = localizedHref(locale.id, route.href);
      const priority =
        route.priority ??
        (route.href.startsWith("/quickstart/") ? "0.8" : "0.7");
      lines.push(
        "  <url>",
        `    <loc>${absolute(href)}</loc>`,
        `    <lastmod>${LASTMOD}</lastmod>`,
        "    <changefreq>weekly</changefreq>",
        `    <priority>${priority}</priority>`,
        "  </url>",
        "",
      );
    }
  }

  lines.push("</urlset>", "");
  return lines.join("\n");
}

writeFileSync("public/llms.txt", buildLlmsTxt());
writeFileSync("public/llms-full.txt", buildLlmsFullTxt());
writeFileSync("public/sitemap.xml", buildSitemap());

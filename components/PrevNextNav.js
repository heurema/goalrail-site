"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPath, localizedPath, stripLocale } from "@/lib/i18n";

const ALL_PAGES = [
  { href: "/docs", key: "docsOverview", section: "" },
  {
    href: "/quickstart/install",
    key: "install",
    section: "start",
  },
  {
    href: "/quickstart/coding-agent",
    key: "codingAgentTutorial",
    section: "start",
  },
  {
    href: "/quickstart/polly",
    key: "pollyTutorial",
    section: "start",
  },
  {
    href: "/quickstart/collaborate",
    key: "collaborateTutorial",
    section: "start",
  },
  {
    href: "/quickstart/policies",
    key: "policiesTutorial",
    section: "start",
  },
  {
    href: "/docs/use/coding-agents",
    key: "codingAgents",
    section: "use",
  },
  {
    href: "/docs/use/builtin-agents",
    key: "builtinAgents",
    section: "use",
  },
  {
    href: "/docs/use/builtin-agents/polly",
    key: "polly",
    section: "use",
  },
  {
    href: "/docs/use/builtin-agents/debby",
    key: "debby",
    section: "use",
  },
  {
    href: "/docs/use/custom-agents",
    key: "customAgents",
    section: "use",
  },
  {
    href: "/docs/build/harnesses",
    key: "harnesses",
    section: "use",
  },
  {
    href: "/docs/build/models",
    key: "models",
    section: "use",
  },
  {
    href: "/docs/build/prompts",
    key: "prompts",
    section: "use",
  },
  { href: "/docs/build/tools", key: "tools", section: "use" },
  { href: "/docs/interact/terminal", key: "terminal", section: "interact" },
  { href: "/docs/interact/web-ui", key: "webUi", section: "interact" },
  { href: "/docs/interact/mobile", key: "mobile", section: "interact" },
  { href: "/docs/interact/desktop", key: "desktop", section: "interact" },
  {
    href: "/docs/collaborate",
    key: "pairing",
    section: "collaboration",
  },
  {
    href: "/docs/deploy/overview",
    key: "server",
    section: "collaboration",
  },
  {
    href: "/docs/collaborate/auth",
    key: "auth",
    section: "collaboration",
  },
  {
    href: "/docs/deploy/database",
    key: "database",
    section: "collaboration",
  },
  {
    href: "/docs/deploy/cloud-sandbox-host",
    key: "cloudSandbox",
    section: "collaboration",
  },
  {
    href: "/docs/policies/overview",
    key: "overview",
    section: "policies",
  },
  {
    href: "/docs/policies/builtin",
    key: "builtinPolicies",
    section: "policies",
  },
  {
    href: "/docs/policies/custom",
    key: "customPolicies",
    section: "policies",
  },
  {
    href: "/docs/policies/os-sandbox",
    key: "omnibox",
    section: "policies",
  },
];

const COPY = {
  en: {
    previous: "Previous",
    next: "Next",
    docsOverview: "Overview",
    start: "Get Started",
    use: "Use Goalrail",
    interact: "Interact",
    collaboration: "Collaboration",
    policies: "Contextual Policies",
    install: "Install Goalrail",
    codingAgentTutorial: "Tutorial: Coding Agent",
    pollyTutorial: "Tutorial: Multi-Agent Coding",
    collaborateTutorial: "Tutorial: Collaborate",
    policiesTutorial: "Tutorial: Contextual Policies",
    codingAgents: "Coding Agents",
    builtinAgents: "Built-in Multi-Agent Workflows",
    polly: "Polly",
    debby: "Debby",
    customAgents: "Custom Agents",
    harnesses: "Harnesses",
    models: "Models & Credentials",
    prompts: "Prompts & Skills",
    tools: "MCP & Tools",
    terminal: "Terminal",
    webUi: "Web UI",
    mobile: "Mobile",
    desktop: "Desktop App",
    pairing: "Pair Programming",
    server: "Shared Server",
    auth: "Auth & SSO",
    database: "Database",
    cloudSandbox: "Cloud Sandbox Host",
    overview: "Overview",
    builtinPolicies: "Builtin Policies",
    customPolicies: "Custom Policies",
    omnibox: "Omnibox",
  },
  ru: {
    previous: "Назад",
    next: "Дальше",
    docsOverview: "Обзор",
    start: "Начало работы",
    use: "Работа с Goalrail",
    interact: "Интерфейсы",
    collaboration: "Совместная работа",
    policies: "Контекстные политики",
    install: "Установка Goalrail",
    codingAgentTutorial: "Туториал: coding agent",
    pollyTutorial: "Туториал: несколько агентов",
    collaborateTutorial: "Туториал: совместная работа",
    policiesTutorial: "Туториал: политики",
    codingAgents: "Coding agents",
    builtinAgents: "Встроенные многоагентные сценарии",
    polly: "Polly",
    debby: "Debby",
    customAgents: "Свои агенты",
    harnesses: "Harnesses",
    models: "Модели и доступы",
    prompts: "Промпты и навыки",
    tools: "MCP и инструменты",
    terminal: "Терминал",
    webUi: "Веб-интерфейс",
    mobile: "Мобильное приложение",
    desktop: "Desktop-приложение",
    pairing: "Парная работа",
    server: "Общий сервер",
    auth: "Auth и SSO",
    database: "База данных",
    cloudSandbox: "Cloud sandbox host",
    overview: "Обзор",
    builtinPolicies: "Встроенные политики",
    customPolicies: "Свои политики",
    omnibox: "Omnibox",
  },
};

function labelFor(t, page) {
  const label = t[page.key];
  return page.section ? `${t[page.section]}: ${label}` : label;
}

export default function PrevNextNav() {
  const path = usePathname();
  const locale = localeFromPath(path);
  const currentPath = stripLocale(path);
  const t = COPY[locale];
  const idx = ALL_PAGES.findIndex((p) => p.href === currentPath);
  if (idx === -1) return null;

  const prev = idx > 0 ? ALL_PAGES[idx - 1] : null;
  const next = idx < ALL_PAGES.length - 1 ? ALL_PAGES[idx + 1] : null;

  return (
    <nav className="prev-next-nav" data-pagefind-ignore>
      {prev ? (
        <Link
          href={localizedPath(locale, prev.href)}
          className="prev-next-link prev-next-link--prev"
        >
          <span className="prev-next-dir">← {t.previous}</span>
          <span className="prev-next-label">{labelFor(t, prev)}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={localizedPath(locale, next.href)}
          className="prev-next-link prev-next-link--next"
        >
          <span className="prev-next-dir">{t.next} →</span>
          <span className="prev-next-label">{labelFor(t, next)}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}

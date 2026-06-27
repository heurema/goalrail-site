"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useDocsSidebar } from "./DocsSidebarContext";
import { localeFromPath, localizedPath, stripLocale } from "@/lib/i18n";

const SECTIONS = [
  {
    key: "start",
    pages: [
      { href: "/quickstart/install", key: "install" },
      { href: "/quickstart/coding-agent", key: "codingAgentTutorial" },
      { href: "/quickstart/polly", key: "pollyTutorial" },
      { href: "/quickstart/collaborate", key: "collaborateTutorial" },
      { href: "/quickstart/policies", key: "policiesTutorial" },
    ],
  },
  {
    key: "useCases",
    pages: [],
    subsections: [
      {
        key: "codingAgents",
        collapsed: false,
        href: "/docs/use/coding-agents",
        pages: [],
      },
      {
        key: "builtinAgents",
        collapsed: true,
        href: "/docs/use/builtin-agents",
        pages: [
          { href: "/docs/use/builtin-agents/polly", key: "polly" },
          { href: "/docs/use/builtin-agents/debby", key: "debby" },
        ],
      },
      {
        key: "customAgents",
        collapsed: true,
        href: "/docs/use/custom-agents",
        pages: [
          { href: "/docs/build/harnesses", key: "harnesses" },
          { href: "/docs/build/models", key: "models" },
          { href: "/docs/build/prompts", key: "prompts" },
          { href: "/docs/build/tools", key: "tools" },
        ],
      },
    ],
  },
  {
    key: "interfaces",
    pages: [
      { href: "/docs/interact/terminal", key: "terminal" },
      { href: "/docs/interact/web-ui", key: "webUi" },
      { href: "/docs/interact/mobile", key: "mobile" },
      { href: "/docs/interact/desktop", key: "desktop" },
    ],
  },
  {
    key: "collaboration",
    pages: [
      { href: "/docs/collaborate", key: "pairing" },
      { href: "/docs/deploy/overview", key: "server" },
      { href: "/docs/collaborate/auth", key: "auth" },
      { href: "/docs/deploy/database", key: "database" },
      { href: "/docs/deploy/cloud-sandbox-host", key: "cloudSandbox" },
    ],
  },
  {
    key: "policies",
    pages: [{ href: "/docs/policies/overview", key: "overview" }],
    subsections: [
      {
        key: "builtinPolicies",
        collapsed: false,
        href: "/docs/policies/builtin",
        pages: [
          { href: "/docs/policies/builtin#safety", key: "safety" },
          {
            href: "/docs/policies/builtin#cost-control",
            key: "costControl",
          },
        ],
      },
      {
        key: "customPolicies",
        collapsed: false,
        href: "/docs/policies/custom",
        pages: [],
      },
    ],
  },
  {
    key: "omnibox",
    pages: [
      { href: "/docs/omnibox", key: "overview" },
      { href: "/docs/policies/os-sandbox", key: "osSandbox" },
    ],
  },
  {
    key: "reference",
    pages: [{ href: "/reference", key: "restApi" }],
  },
];

const COPY = {
  en: {
    start: "Get Started",
    useCases: "Use Cases",
    interfaces: "Interfaces",
    collaboration: "Collaboration",
    policies: "Contextual Policies",
    omnibox: "Omnibox",
    reference: "Reference",
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
    safety: "Safety",
    costControl: "Cost Control",
    customPolicies: "Custom Policies",
    osSandbox: "OS Sandbox Config",
    restApi: "REST API",
  },
  ru: {
    start: "Начало работы",
    useCases: "Сценарии",
    interfaces: "Интерфейсы",
    collaboration: "Совместная работа",
    policies: "Контекстные политики",
    omnibox: "Omnibox",
    reference: "Справочник",
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
    safety: "Безопасность",
    costControl: "Контроль расходов",
    customPolicies: "Свои политики",
    osSandbox: "Настройка OS sandbox",
    restApi: "REST API",
  },
};

export default function DocsSidebarFull() {
  const path = usePathname();
  const locale = localeFromPath(path);
  const currentPath = stripLocale(path);
  const text = COPY[locale];
  const { open: drawerOpen, close: closeDrawer } = useDocsSidebar();

  useEffect(() => {
    closeDrawer();
  }, [path, closeDrawer]);

  const [sectionOpen, setSectionOpen] = useState(() =>
    SECTIONS.reduce((acc, s, i) => {
      acc[i] = true;
      return acc;
    }, {}),
  );

  const [subOpen, setSubOpen] = useState(() => {
    const state = {};
    SECTIONS.forEach((s, si) => {
      if (s.subsections) {
        s.subsections.forEach((sub, ci) => {
          const key = `${si}-${ci}`;
          const hasActivePage =
            sub.pages.some((p) => p.href === currentPath) ||
            sub.href === currentPath;
          state[key] = !sub.collapsed || hasActivePage;
        });
      }
    });
    return state;
  });

  // Expand the section + subsection containing the active page on every route
  // change. The sidebar persists across client-side navigation (it lives in the
  // layout and never remounts), so the useState initializers above only run on
  // first mount. Without this, navigating into a collapsed subsection — via a
  // search result, an in-content link, or prev/next nav — leaves it closed and
  // hides where you are. Only force-opens the matching entries, never collapses.
  useEffect(() => {
    SECTIONS.forEach((s, si) => {
      const inSectionPages = s.pages.some((p) => p.href === currentPath);
      if (inSectionPages) {
        setSectionOpen((o) => (o[si] ? o : { ...o, [si]: true }));
      }
      s.subsections?.forEach((sub, ci) => {
        const isActive =
          sub.href === currentPath ||
          sub.pages.some((p) => p.href === currentPath);
        if (isActive) {
          setSectionOpen((o) => (o[si] ? o : { ...o, [si]: true }));
          const key = `${si}-${ci}`;
          setSubOpen((o) => (o[key] ? o : { ...o, [key]: true }));
        }
      });
    });
  }, [currentPath]);

  return (
    <>
      {drawerOpen && (
        <div className="docs-sidebar-backdrop" onClick={closeDrawer} />
      )}
      <aside className={`docs-side ${drawerOpen ? "docs-side-open" : ""}`}>
        {SECTIONS.map((section, si) => {
          const isOpen = sectionOpen[si];

          return (
            <div key={section.key}>
              <h4
                onClick={() => setSectionOpen((o) => ({ ...o, [si]: !o[si] }))}
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {text[section.key]}
                <span
                  style={{
                    fontSize: "0.55rem",
                    opacity: 0.4,
                    transition: "transform 0.15s",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                >
                  ▶
                </span>
              </h4>

              {isOpen && (
                <ul>
                  {section.pages.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={localizedPath(locale, p.href)}
                        className={currentPath === p.href ? "active" : ""}
                      >
                        {text[p.key]}
                      </Link>
                    </li>
                  ))}

                  {section.subsections &&
                    section.subsections.map((sub, ci) => {
                      const subKey = `${si}-${ci}`;
                      const subIsOpen = subOpen[subKey];
                      const subIsActive = sub.href === currentPath;

                      return (
                        <li key={sub.key} style={{ listStyle: "none" }}>
                          {sub.href ? (
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0,
                              }}
                            >
                              <Link
                                href={localizedPath(locale, sub.href)}
                                className={subIsActive ? "active" : ""}
                                style={{
                                  flex: 1,
                                  display: "block",
                                  padding: "0.25rem 0.6rem 0.25rem 1.2rem",
                                  borderRadius: "7px",
                                  fontSize: "0.9rem",
                                }}
                              >
                                {text[sub.key]}
                              </Link>
                              {sub.pages.length > 0 && (
                                <span
                                  onClick={() =>
                                    setSubOpen((o) => ({
                                      ...o,
                                      [subKey]: !o[subKey],
                                    }))
                                  }
                                  role="button"
                                  tabIndex={0}
                                  style={{
                                    cursor: "pointer",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.5rem",
                                    opacity: 0.4,
                                    transition: "transform 0.15s",
                                    transform: subIsOpen
                                      ? "rotate(90deg)"
                                      : "rotate(0deg)",
                                  }}
                                >
                                  ▶
                                </span>
                              )}
                            </span>
                          ) : (
                            <span
                              onClick={() =>
                                setSubOpen((o) => ({
                                  ...o,
                                  [subKey]: !o[subKey],
                                }))
                              }
                              role="button"
                              tabIndex={0}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                cursor: "pointer",
                                padding: "0.25rem 0.6rem",
                                borderRadius: "7px",
                                fontSize: "0.9rem",
                                color: "var(--fg-soft)",
                              }}
                            >
                              {text[sub.key]}
                              <span
                                style={{
                                  fontSize: "0.5rem",
                                  opacity: 0.4,
                                  transition: "transform 0.15s",
                                  transform: subIsOpen
                                    ? "rotate(90deg)"
                                    : "rotate(0deg)",
                                }}
                              >
                                ▶
                              </span>
                            </span>
                          )}
                          {subIsOpen && sub.pages.length > 0 && (
                            <ul
                              style={{
                                paddingLeft: "0.6rem",
                                marginBottom: "0.3rem",
                              }}
                            >
                              {sub.pages.map((p) => (
                                <li key={p.href}>
                                  <Link
                                    href={localizedPath(locale, p.href)}
                                    className={
                                      currentPath === p.href ? "active" : ""
                                    }
                                    style={{ paddingLeft: "0.9rem" }}
                                  >
                                    {text[p.key]}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          );
        })}
      </aside>
    </>
  );
}

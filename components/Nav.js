"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHubIcon, TelegramIcon } from "./icons";
import { GITHUB_URL, TELEGRAM_URL } from "./links";
import DocSearch from "./DocSearch";
import { localeFromPath, localizedPath, switchLocalePath } from "@/lib/i18n";

const copy = {
  en: {
    start: "Get Started",
    docs: "Docs",
    api: "API",
    language: "Русский",
  },
  ru: {
    start: "Начать",
    docs: "Документация",
    api: "API",
    language: "English",
  },
};

export default function Nav({ menuToggle }) {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const t = copy[locale];
  const nextLocale = locale === "ru" ? "en" : "ru";

  return (
    <header className="nav">
      <div className="nav-inner">
        {menuToggle && <div className="nav-menu-toggle">{menuToggle}</div>}
        <Link href={localizedPath(locale, "/")} className="brand">
          <span className="brand-mark" aria-hidden="true">
            gr
          </span>
          <span className="brand-wordmark">Goalrail</span>
        </Link>
        <nav className="nav-links">
          <Link
            href={localizedPath(locale, "/quickstart/install")}
            className="nav-link"
          >
            {t.start}
          </Link>
          <Link
            href={localizedPath(locale, "/docs/use/coding-agents")}
            className="nav-link"
          >
            {t.docs}
          </Link>
          <Link href={localizedPath(locale, "/reference")} className="nav-link">
            {t.api}
          </Link>
          <Link
            href={switchLocalePath(pathname, nextLocale)}
            className="nav-link"
          >
            {t.language}
          </Link>
          <a
            href={GITHUB_URL}
            className="nav-icon"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon size={20} />
          </a>
          <a
            href={TELEGRAM_URL}
            className="nav-icon"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
          >
            <TelegramIcon size={20} />
          </a>
          <DocSearch />
        </nav>
      </div>
    </header>
  );
}

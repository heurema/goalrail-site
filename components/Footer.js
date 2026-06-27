"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHubIcon, TelegramIcon } from "./icons";
import { GITHUB_URL, TELEGRAM_URL } from "./links";
import { localeFromPath, localizedPath } from "@/lib/i18n";

const copy = {
  en: {
    built: "Open-source agent platform by Heurema.",
    start: "Get Started",
    docs: "Docs",
  },
  ru: {
    built: "Открытая платформа для агентных рабочих процессов от Heurema.",
    start: "Начать",
    docs: "Документация",
  },
};

export default function Footer() {
  const locale = localeFromPath(usePathname());
  const t = copy[locale];

  return (
    <footer className="footer">
      <div className="wrap-wide footer-inner">
        <span>{t.built}</span>
        <span className="spacer" />
        <Link href={localizedPath(locale, "/quickstart/install")}>
          {t.start}
        </Link>
        <Link href={localizedPath(locale, "/docs/use/coding-agents")}>
          {t.docs}
        </Link>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <GitHubIcon size={15} /> GitHub
          </span>
        </a>
        <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <TelegramIcon size={15} /> Telegram
          </span>
        </a>
        <span className="muted">Apache 2.0</span>
      </div>
    </footer>
  );
}

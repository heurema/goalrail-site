"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RocketIcon, AppleIcon, TelegramIcon } from "@/components/icons";
import { TELEGRAM_URL } from "@/components/links";
import { localeFromPath, localizedPath } from "@/lib/i18n";

const copy = {
  en: {
    start: "Get Started",
    mac: "macOS App",
    telegram: "@goalrail",
  },
  ru: {
    start: "Начать",
    mac: "Приложение для macOS",
    telegram: "@goalrail",
  },
};

export default function CtaButtons() {
  const locale = localeFromPath(usePathname());
  const t = copy[locale];

  return (
    <div className="hero-cta">
      <Link
        href={localizedPath(locale, "/quickstart/install")}
        className="btn btn-primary"
      >
        <RocketIcon size={16} /> {t.start}
      </Link>
      <Link
        href={localizedPath(locale, "/quickstart/install#add-the-macos-app")}
        className="btn"
      >
        <AppleIcon size={16} /> {t.mac}
      </Link>
      <a href={TELEGRAM_URL} className="btn" target="_blank" rel="noreferrer">
        <TelegramIcon /> {t.telegram}
      </a>
    </div>
  );
}

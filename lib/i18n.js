export const DEFAULT_LOCALE = "en";
export const LOCALES = ["en", "ru"];

export function localeFromPath(pathname = "") {
  const first = pathname.split("/").filter(Boolean)[0];
  return LOCALES.includes(first) ? first : DEFAULT_LOCALE;
}

export function stripLocale(pathname = "") {
  const parts = pathname.split("/").filter(Boolean);
  if (LOCALES.includes(parts[0])) {
    const stripped = `/${parts.slice(1).join("/")}`;
    return stripped === "/" ? "/" : stripped.replace(/\/$/, "");
  }
  return pathname || "/";
}

export function localizedPath(locale, href) {
  if (!href || href.startsWith("#")) return href;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return href;
  if (href.startsWith("/download/") || href === "/install.sh") return href;

  const [path, hash = ""] = href.split("#");
  const unlocalized = stripLocale(path);
  const normalizedPath = unlocalized === "/" ? "" : unlocalized;
  return `/${locale}${normalizedPath}${hash ? `#${hash}` : ""}`;
}

export function switchLocalePath(pathname = "", nextLocale = DEFAULT_LOCALE) {
  const current = stripLocale(pathname);
  return localizedPath(nextLocale, current);
}

import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { siteUrl } from "@/lib/site";

const enableAnalytics = Boolean(process.env.VERCEL);

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Goalrail — an open layer for building and running AI agents",
    template: "%s · Goalrail",
  },
  description:
    "Goalrail is an open-source layer for composing, governing, and collaborating on AI agents across the harnesses you already use.",
  openGraph: {
    // title/description intentionally omitted so they fall back to each page's
    // resolved (templated) title + description, making child-page cards specific.
    url: siteUrl,
    siteName: "Goalrail",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/goalrail-social-card.svg`,
        width: 1200,
        height: 630,
        alt: "Goalrail — an open layer for AI agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${siteUrl}/images/goalrail-social-card.svg`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        {enableAnalytics ? <Analytics /> : null}
      </body>
    </html>
  );
}

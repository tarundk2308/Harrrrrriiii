import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const description =
  "Engagement of Hariharan and Sharon. Friday, 4 December 2026, 7:30 in the evening, Chennai. Under the blessing of godfather Sivaramakrishnan.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hariharan & Sharon",
  description,
  applicationName: "Hariharan & Sharon",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Hariharan & Sharon",
    description:
      "Friday, 4 December 2026 · 7:30 in the evening · Chennai. Under the blessing of godfather Sivaramakrishnan.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hariharan & Sharon",
    description: "Engagement · 4 December 2026 · 7:30 pm · Chennai",
  },
};

export const viewport: Viewport = {
  themeColor: "#F3EEE6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Noto+Serif+Tamil:wght@400;500;600&family=Outfit:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

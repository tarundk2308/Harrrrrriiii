import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const description =
  "Engagement of Hariharan Agilan & Sharon Belinda Benedict · Friday, 4 December 2026 · Chennai.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Engagement · Hariharan & Sharon",
  description,
  applicationName: "Hariharan & Sharon",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Engagement · Hariharan & Sharon",
    description: "Friday, 4 December 2026 · Chennai",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F0F5",
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Nunito:wght@400;500;600&family=Noto+Serif+Tamil:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

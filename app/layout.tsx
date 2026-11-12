import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const description =
  "Hariharan Agilan & Sharon Belinda Benedict — wedding celebrations in Chennai, 28 January 2027.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hariharan Agilan & Sharon Belinda Benedict",
  description,
  applicationName: "Hariharan & Sharon",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Hariharan Agilan & Sharon Belinda Benedict",
    description: "Thursday, 28 January 2027 · Chennai",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hariharan Agilan & Sharon Belinda Benedict",
    description: "Wedding · 28 January 2027 · Chennai",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFCFD",
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

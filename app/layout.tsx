import type { Metadata, Viewport } from "next";
import { Fraunces, Noto_Serif_Tamil, Outfit } from "next/font/google";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-sans",
});

const tamil = Noto_Serif_Tamil({
  subsets: ["tamil"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-tamil",
});

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
    <html lang="en" className={`${serif.variable} ${sans.variable} ${tamil.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/siteUrl";
import { switzer, zodiak, zodiakItalic } from "./fonts";
import "./globals.css";

const title = `${site.name} · Kumasi, Ghana`;

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title,
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: site.locale,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#edeeea",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GH" className={`${zodiak.variable} ${zodiakItalic.variable} ${switzer.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}

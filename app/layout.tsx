import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import AnalyticsProvider from "@/components/Analytics";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yogshala-theta.vercel.app";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: "Yog Shala",
  description:
    "Personalized posture assessment and movement care. Begin with a short pre-assessment questionnaire, then get a session tailored to your body and goals.",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  logo: `${SITE_URL}/icon.svg`,
  priceRange: "$$",
  sameAs: [],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yog Shala — Move Better. Feel Better. Live Better.",
    template: "%s | Yog Shala",
  },
  description:
    "Personalized posture assessment and movement care at Yog Shala. Begin with a short pre-assessment questionnaire, then get a session tailored to your body and goals.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Yog Shala",
    title: "Yog Shala — Move Better. Feel Better. Live Better.",
    description:
      "Personalized posture assessment and movement care. Start with a short pre-assessment, then get a session tailored to your body and goals.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yog Shala — Move Better. Feel Better. Live Better.",
    description:
      "Personalized posture assessment and movement care. Start with a short pre-assessment, then get a session tailored to your body and goals.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
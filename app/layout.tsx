// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { generateMetadata } from "@/lib/metadata";
import { seoConfig } from "@/lib/seo.config";
import { viewport as viewportConfig } from "./viewport";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContactButton from "@/components/ui/FloatingContactButton";
import { Analytics } from "@vercel/analytics/next";
import { ChatWidget } from "@/components/ChatWidget";

// Font optimization with display swap for better CLS
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: true,
  fallback: ["monospace"],
});

// Export viewport separately
export const viewport = viewportConfig;

// Global metadata
export const metadata: Metadata = {
  ...generateMetadata(),
  
  // Manifest for PWA
  manifest: "/manifest.webmanifest",
  
  // Comprehensive icon configuration
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: seoConfig.themeColor,
      },
    ],
  },
  
  // Apple Web App configuration
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: seoConfig.siteName,
    startupImage: [
      {
        url: "/splash-1170x2532.png",
        media: "(device-width: 390px) and (device-height: 844px)",
      },
    ],
  },
  
  // Additional metadata
  category: "technology",
  classification: "Web Development Portfolio",
  referrer: "origin-when-cross-origin",
  
  // Verification codes
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
    // yandex: process.env.YANDEX_VERIFICATION,
    // yahoo: process.env.YAHOO_VERIFICATION,
  },
  
  // Format detection (disable auto-linking)
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Other important meta tags
  other: {
    "msapplication-TileColor": seoConfig.themeColor,
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        {/* DNS prefetch for third-party resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/og-image.png"
          as="image"
          type="image/png"
        />
      </head>
      <body className="font-sans bg-background text-foreground antialiased min-h-screen flex flex-col">
        {/* Skip to main content - Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main id="main-content" className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating contact button */}
        {/* <FloatingContactButton /> */}
        <ChatWidget />
        
      </body>
      <Analytics />
    </html>
  );
}
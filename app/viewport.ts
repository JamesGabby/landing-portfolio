// src/app/viewport.ts
import { Viewport } from "next";
import { seoConfig } from "@/lib/seo.config";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: seoConfig.themeColor },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark light",
  viewportFit: "cover",
};
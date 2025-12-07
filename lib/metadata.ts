// src/lib/metadata.ts
import { Metadata } from "next";
import { seoConfig } from "./seo.config";

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  canonical?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateMetadata(
  options: GenerateMetadataOptions = {}
): Metadata {
  const {
    title,
    description = seoConfig.description,
    keywords = seoConfig.keywords,
    image = "/og-image.png",
    noIndex = false,
    canonical,
    type = "website",
    publishedTime,
    modifiedTime,
  } = options;

  const metaTitle = title
    ? `${title} | ${seoConfig.siteName}`
    : seoConfig.title;

  const imageUrl = image.startsWith("http")
    ? image
    : `${seoConfig.siteUrl}${image}`;

  const canonicalUrl = canonical
    ? `${seoConfig.siteUrl}${canonical}`
    : seoConfig.siteUrl;

  return {
    title: metaTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: seoConfig.author.name }],
    creator: seoConfig.author.name,
    publisher: seoConfig.author.name,
    metadataBase: new URL(seoConfig.siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      locale: seoConfig.locale,
      url: canonicalUrl,
      title: metaTitle,
      description,
      siteName: seoConfig.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
          type: "image/png",
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [imageUrl],
      creator: seoConfig.author.twitter,
      site: seoConfig.author.twitter,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
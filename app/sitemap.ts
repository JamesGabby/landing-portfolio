// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo.config";

// Define your static pages
const staticPages = [
  {
    route: "",
    priority: 1.0,
    changeFrequency: "weekly" as const,
  },
  {
    route: "/about",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    route: "/projects",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  {
    route: "/services",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    route: "/contact",
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = seoConfig.siteUrl;
  const currentDate = new Date();

  // Generate static pages sitemap entries
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.route}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // If you have dynamic content (projects, blog posts), fetch and add them
  // Example with projects:
  // const projects = await getProjects();
  // const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
  //   url: `${baseUrl}/projects/${project.slug}`,
  //   lastModified: project.updatedAt || project.createdAt,
  //   changeFrequency: "monthly",
  //   priority: 0.7,
  // }));

  return [
    ...staticEntries,
    // ...projectEntries,
  ];
}
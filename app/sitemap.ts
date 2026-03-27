import type { MetadataRoute } from "next";

const baseUrl = "https://gradeum.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/product", "/pricing", "/about", "/trial", "/blog", "/docs", "/privacy", "/terms"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/trial" ? 0.9 : 0.7
  }));
}

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gradeum.io";
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/firms`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/firms/product`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/firms/demo`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/firms/pricing`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/agencies`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/agencies/product`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/agencies/use-cases`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/agencies/pricing`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/agencies/contact`, lastModified: new Date(), priority: 0.8 },
  ];
}

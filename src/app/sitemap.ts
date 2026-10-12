import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { catalogueSingles } from "@/data/discography";

const siteUrl = "https://www.gwizztheslayer.co.za";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const articles = await client.fetch<Array<{ slug?: string; publishedAt?: string }>>(
      `*[_type == "transmission" && defined(slug.current)]{ "slug": slug.current, publishedAt }`
    );
    articleEntries = articles.flatMap((article) => article.slug ? [{
      url: `${siteUrl}/articles/${encodeURIComponent(article.slug)}`,
      ...(article.publishedAt ? { lastModified: article.publishedAt } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }] : []);
  } catch {
    // Keep the static sitemap available while Sanity is unavailable.
  }

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/discography`, changeFrequency: "monthly", priority: 0.8 },
    ...catalogueSingles.map((single) => ({
      url: `${siteUrl}/discography/${single.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${siteUrl}/physical-work`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/comic`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/gallery`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/visuals`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/articles`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/live-events`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/merchandise`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/avc`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/network`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/lyrics`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/support`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteUrl}/links`, changeFrequency: "monthly", priority: 0.5 },
    ...articleEntries,
  ];
}

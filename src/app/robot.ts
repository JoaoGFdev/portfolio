import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/*", "/en", "/pt"],
    },
    sitemap: "https://www.joaogf.dev/sitemap.xml",
  }
}

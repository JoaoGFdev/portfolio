import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "pt"],
  defaultLocale: "en",
  // Every page lives under /en or /pt so both versions prerender as static HTML.
  localePrefix: "always",
})

export type Locale = (typeof routing.locales)[number]

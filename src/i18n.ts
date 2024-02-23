import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"

export type Locale = {
  locale: "en" | "pt"
}

export type LocaleParams = {
  params: Locale
}

export const locales = ["en", "pt"]

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound()

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})

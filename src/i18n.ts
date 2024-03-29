import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"

export const locales = ["en", "pt"] as const

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound()

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})

export type Locale = (typeof locales)[number]

export type LocaleLayout = {
  params: {
    locale: Locale
  }
  children: React.ReactNode
}

export type LocalePage = {
  params: {
    locale: Locale
    [key: string]: string | string[]
  }
  searchParams: Record<string, string | string[] | undefined>
}

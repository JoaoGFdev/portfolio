import "~/app/globals.css"

import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import { Provider } from "~/components/providers"
import { type LocaleLayout, type LocalePage, locales } from "~/i18n"
import { cn } from "~/lib/utils"

import { Header } from "../../components/header"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const anta = localFont({
  src: "./anta.ttf",
  variable: "--font-anta",
  display: "swap",
})

export async function generateMetadata({ params: { locale } }: LocalePage) {
  const t = await getTranslations({ locale, namespace: "Metadata" })

  return {
    metadataBase: new URL("https://joaogf.dev/"),
    title: "Joaogf | Portfolio",
    description: t("description"),
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    keywords:
      "frontend, front-end, backend, back-end, fullstack, web development, software engineering, programming, typescript, react, nextjs, tailwindcss, prisma, postgres, javascript, nodejs, software, technology, tech, portfolio, personal website, joaogf, joao guilherme fonseca, brasil",
    lang: locale,
    twitter: {
      title: t("twitter.title"),
      description: t("twitter.description"),
      creator: "@joaogf_dev",
      site: "@joaogf_dev",
    },
    openGraph: {
      type: "website",
      url: "https://joaogf.dev/",
      title: t("twitter.title"),
      description: t("twitter.description"),
    },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function RootLayout({
  children,
  params: { locale },
}: LocaleLayout) {
  unstable_setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-screen flex-col overflow-y-scroll",
          "bg-white dark:bg-slate-900",
          "selection:bg-zinc-200 dark:selection:bg-zinc-700",
          "font-sans antialiased",
          anta.variable,
          inter.variable,
        )}
      >
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  )
}

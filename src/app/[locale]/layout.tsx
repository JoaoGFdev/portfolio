import "~/app/globals.css"

import { Inter } from "next/font/google"
import { cn } from "~/lib/utils"
import { Provider } from "./providers"
import localFont from "next/font/local"
import { type LocaleParams } from "~/i18n"
import { unstable_setRequestLocale } from "next-intl/server"
import { Header } from "./(app)/header"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const anta = localFont({
  src: "./anta.ttf",
  variable: "--font-anta",
  display: "swap",
})

export const metadata = {
  title: "Joaogf",
  description: "João Guilherme's portfolio, a software engineer from Brazil.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
  params: { locale },
}: LocaleParams) {
  unstable_setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-screen flex-col",
          "bg-slate-50 dark:bg-slate-950",
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

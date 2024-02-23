import "~/app/globals.css"

import { Inter } from "next/font/google"
import { cn } from "~/lib/utils"
import { Provider } from "./providers"
import localFont from "next/font/local"

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
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-screen",
          "bg-slate-100 dark:bg-slate-900",
          "selection:bg-slate-300 dark:selection:bg-slate-700",
          "font-sans antialiased",
          anta.variable,
          inter.variable,
        )}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}

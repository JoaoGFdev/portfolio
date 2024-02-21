import "~/app/globals.css"

import { Inter } from "next/font/google"
import { cn } from "~/lib/utils"
import { Provider } from "./providers"
import { type PropsWithChildren } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Joaogf",
  description: "João Guilherme's portfolio, a software engineer from Brazil.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "font-sans  antialiased",
          "flex-co flex min-h-screen bg-slate-100 dark:bg-slate-900",
          inter.variable,
        )}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}

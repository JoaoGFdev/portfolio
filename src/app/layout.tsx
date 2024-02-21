import "~/app/globals.css"

import { Inter } from "next/font/google"
import { cn } from "~/lib/utils"
import { Provider } from "./providers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Portfolio",
  description: "João Guilherme's portfolio, a software engineer from Brazil.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          inter.variable,
        )}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}

"use client"

import { ptBR } from "@clerk/localizations"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useLocale } from "next-intl"
import { useTheme } from "next-themes"
import type { PropsWithChildren } from "react"

import { ThemeProvider } from "~/components/providers/theme-provide"
import { Toaster } from "~/components/ui/sonner"
import { TRPCReactProvider } from "~/trpc/react"

export function Provider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Clerk>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </Clerk>
    </ThemeProvider>
  )
}

function Clerk({ children }: PropsWithChildren) {
  const locale = useLocale()
  const { theme } = useTheme()

  return (
    <ClerkProvider
      localization={locale === "pt" ? ptBR : undefined}
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  )
}

"use client"

import type { PropsWithChildren } from "react"
import { ThemeProvider } from "~/components/providers/theme-provide"
import { Toaster } from "~/components/ui/sonner"
import { TRPCReactProvider } from "~/trpc/react"
import { ClerkProvider } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { dark } from "@clerk/themes"
import { Analytics } from "@vercel/analytics/react"
import { ptBR } from "@clerk/localizations"
import { useLocale } from "next-intl"

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

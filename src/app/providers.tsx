"use client"

import { type PropsWithChildren } from "react"
import { ThemeProvider } from "~/components/providers/theme-provide"
import { Toaster } from "~/components/ui/sonner"
import { TRPCReactProvider } from "~/trpc/react"
import { ClerkProvider } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { dark } from "@clerk/themes"
import { ptBR } from "@clerk/localizations"

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
      </Clerk>
    </ThemeProvider>
  )
}

function Clerk({ children }: PropsWithChildren) {
  const { theme } = useTheme()

  return (
    <ClerkProvider
      localization={ptBR}
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  )
}

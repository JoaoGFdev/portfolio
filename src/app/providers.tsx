import { type PropsWithChildren } from "react"
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
      <TRPCReactProvider>{children}</TRPCReactProvider>
      <Toaster />
    </ThemeProvider>
  )
}

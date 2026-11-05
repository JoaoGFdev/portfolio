"use client"
import { ThemeProvider as Provider, type ThemeProviderProps } from "next-themes"

// next-themes injects an inline <script> that sets the theme before paint. It
// only needs to run in the server HTML. Switching locale remounts the layout on
// the client, so mark client-created copies as inert data to keep React 19 from
// warning about scripts that never execute. The effect inside next-themes still
// applies the theme after the remount.
const scriptProps = {
  type: typeof window === "undefined" ? undefined : "application/json",
  suppressHydrationWarning: true,
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <Provider scriptProps={scriptProps} {...props}>
      {children}
    </Provider>
  )
}

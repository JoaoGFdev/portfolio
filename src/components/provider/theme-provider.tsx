"use client"
import { ThemeProvider as Provider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <Provider {...props}>{children}</Provider>
}

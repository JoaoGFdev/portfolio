"use client"

import { Moon, Sun } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import * as React from "react"

export function ToggleTheme() {
  const t = useTranslations("Header")

  const { setTheme, theme } = useTheme()

  return (
    <button
      className="flex gap-2 rounded-xl p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
      onClick={(e) => {
        e.preventDefault()
        if (theme === "light") setTheme("dark")
        else setTheme("light")
      }}
    >
      <Sun className="size-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">{t("toggleTheme")}</span>
    </button>
  )
}

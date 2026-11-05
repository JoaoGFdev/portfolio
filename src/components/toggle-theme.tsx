"use client"

import { Moon, Sun } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"

export function ToggleTheme() {
  const t = useTranslations("Header")
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label={t("toggleTheme")}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative grid size-10 place-items-center rounded-md text-muted transition-colors hover:bg-rule/60 hover:text-ink"
    >
      <Sun aria-hidden className="size-5 dark:hidden" />
      <Moon aria-hidden className="hidden size-5 dark:block" />
    </button>
  )
}

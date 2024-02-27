"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import type { Locale } from "~/i18n"
import { cn } from "~/lib/utils"

export function ToggleLocale() {
  const router = useRouter()

  const pathname = usePathname()
  const locale = useLocale()

  function setLocale(l: Locale) {
    if (l === locale) return

    const href = pathname.replace(`/${locale}`, `/${l}`)

    router.replace(href)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <p className="font-anta text-lg font-bold">{locale.toUpperCase()}</p>
          <span className="sr-only">Toggle locale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-1">
        <DropdownMenuItem
          className={
            (cn(locale === "pt" && "bg-slate-100 dark:bg-slate-800"),
            "font-anta")
          }
          onClick={() => setLocale("pt")}
        >
          PT
        </DropdownMenuItem>
        <DropdownMenuItem
          className={
            (cn(locale === "en" && "bg-slate-100 dark:bg-slate-800"),
            "font-anta")
          }
          onClick={() => setLocale("en")}
        >
          EN
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

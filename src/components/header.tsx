import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { ToggleLocale } from "./toggle-locale"
import { ToggleTheme } from "./toggle-theme"

export async function Header() {
  const t = await getTranslations("Header")

  return (
    <header className="mb-12 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">João Guilherme Fonseca</h1>
        <div className="flex gap-2">
          <ToggleLocale />
          <ToggleTheme />
        </div>
      </div>

      <div className="flex items-center space-x-1 text-zinc-900 dark:text-zinc-400">
        <Link
          href="https://github.com/JoaoGFdev"
          className="rounded-xl p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </Link>
        <Link
          href="https://www.linkedin.com/in/joaogfonseca/"
          className="rounded-xl p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Linkedin className="h-5 w-5" />
          <span className="sr-only">LinkedIn</span>
        </Link>
        <Link
          href="mailto:me@joaogf.dev"
          className="flex items-center gap-2 rounded-xl p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Mail className="h-5 w-5" />
          <span>me@joaogf.dev</span>
        </Link>
      </div>

      <p className="max-w-3xl text-zinc-800 dark:text-zinc-400">
        {t("description")}
      </p>
    </header>
  )
}

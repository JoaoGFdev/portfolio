import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

import { ToggleTheme } from "./toggle-theme"
// text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800
export function Header() {
  return (
    <header className="mb-12 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">João Guilherme Fonseca</h1>
        <ToggleTheme />
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

      <p className="max-w-2xl text-zinc-800 dark:text-zinc-400">
        Front End Developer from Brazil. I&apos;m passionate about web
        development and I love to create beautiful and performant websites.
        I&apos;m always looking for new challenges and opportunities to learn
        and grow
      </p>
    </header>
  )
}

import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="mb-12 space-y-6">
      <h1 className="text-4xl font-bold">João Guilherme Fonseca</h1>
      <div className="flex items-center space-x-4 text-zinc-400">
        <Link
          href="https://github.com/JoaoGFdev"
          className="transition-colors hover:text-white"
        >
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </Link>
        <Link
          href="https://www.linkedin.com/in/joaogfonseca/"
          className="transition-colors hover:text-white"
        >
          <Linkedin className="h-5 w-5" />
          <span className="sr-only">LinkedIn</span>
        </Link>
        <Link
          href="mailto:me@joaogf.dev"
          className="flex items-center gap-2 transition-colors hover:text-white"
        >
          <Mail className="h-5 w-5" />
          <span>me@joaogf.dev</span>
        </Link>
      </div>
      <p className="max-w-2xl leading-relaxed text-zinc-400">
        Front End Developer from Brazil. I&apos;m passionate about web
        development and I love to create beautiful and performant websites.
        I&apos;m always looking for new challenges and opportunities to learn
        and grow
      </p>
    </header>
  )
}

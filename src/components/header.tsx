import { FileText, Github, Linkedin, Mail } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"

import { ToggleLocale } from "./toggle-locale"
import { ToggleTheme } from "./toggle-theme"

const links = [
  { href: "https://github.com/JoaoGFdev", label: "GitHub", Icon: Github },
  {
    href: "https://www.linkedin.com/in/joaogfonseca/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  { href: "mailto:me@joaogf.dev", label: "me@joaogf.dev", Icon: Mail },
]

export async function Header() {
  const t = await getTranslations("Header")
  const tr = await getTranslations("Resume")
  const resume = {
    href:
      (await getLocale()) === "pt"
        ? "/cv/joao-guilherme-fonseca-curriculo.pdf"
        : "/cv/joao-guilherme-fonseca-resume.pdf",
    label: tr("download"),
    Icon: FileText,
  }

  return (
    <header>
      <div className="flex justify-end gap-1">
        <ToggleLocale />
        <ToggleTheme />
      </div>

      <h1 className="mt-10 font-display text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.92] font-extrabold tracking-[-0.025em] [font-stretch:75%] md:mt-16">
        João Guilherme
        <br />
        Fonseca
      </h1>

      <p className="mt-6 text-xl font-medium md:text-2xl">
        {t("role")}
        <span className="block text-base font-normal text-muted md:text-lg">
          {t("location")}
        </span>
      </p>

      <p className="mt-6 max-w-[62ch] text-muted">{t("description")}</p>

      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
        {[...links, resume].map(({ href, label, Icon }) => (
          <li key={href}>
            <a
              href={href}
              className="inline-flex items-center gap-2 font-medium text-blue underline decoration-blue/30 underline-offset-4 hover:decoration-blue"
            >
              <Icon aria-hidden className="size-4" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  )
}

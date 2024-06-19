import { Mail } from "lucide-react"
import { useTranslations } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import type { LocaleLayout } from "~/i18n"

import { Education } from "./_components/education"
import { FilterExperiences } from "./_components/filter-experiences"

export default function PortfolioLayout({
  children,
  params: { locale },
}: LocaleLayout) {
  unstable_setRequestLocale(locale)

  const t = useTranslations("portfolio")

  return (
    <div className="flex flex-col gap-y-8 pt-12">
      <div className="flex flex-col space-y-4">
        <div className="flex gap-4 sm:gap-6">
          <div className="flex flex-col space-y-2">
            <Avatar className="static h-32 w-32 rounded-3xl sm:h-36 sm:w-36 md:h-48 md:w-48">
              <AvatarImage
                src="https://github.com/JoaoGFdev.png"
                alt="@JoaoGFdev"
              />
              <AvatarFallback className="rounded-3xl font-anta text-5xl md:text-9xl">
                JG
              </AvatarFallback>
            </Avatar>
            <Button
              variant="link"
              size="sm"
              className="h-4 w-fit items-center justify-start px-0"
              asChild
            >
              <a href="mailto:me@joaogf.dev">
                <Mail className="mr-1 h-4 w-4" />
                me@joaogf.dev
              </a>
            </Button>
          </div>

          <div className="flex flex-col space-y-2">
            <h1 className="font-anta text-4xl font-bold sm:text-5xl lg:text-6xl">
              João Guilherme Fonseca
            </h1>
            <p className="hidden whitespace-pre-line text-sm md:flex md:text-base lg:w-3/4">
              {t("description")}
            </p>
          </div>
        </div>
        <p className="flex whitespace-pre-line md:hidden">{t("description")}</p>
      </div>

      <article className="whitespace-pre-line text-lg">{t("article")}</article>

      <div className="flex flex-col space-y-6 md:space-y-12">
        <FilterExperiences filter={t("filter")}>
          <div className="flex w-full items-center space-x-4">
            <h2 className="min-w-fit text-2xl font-semibold md:text-4xl">
              {t("experience")}
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-slate-600" />
          </div>
        </FilterExperiences>

        {children}
      </div>

      <Education />
    </div>
  )
}

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Experiences, LoadingExperiences } from "./experiences"
import { useTranslations } from "next-intl"
import type { LocalePage } from "~/i18n"
import { unstable_setRequestLocale } from "next-intl/server"
import { Suspense } from "react"
import { Button } from "~/components/ui/button"
import { Mail } from "lucide-react"

export default function HomePage({ params: { locale } }: LocalePage) {
  unstable_setRequestLocale(locale)

  const t = useTranslations("portfolio")

  return (
    <div className="flex flex-1 flex-col gap-y-8 pt-12">
      <div className="flex gap-4 sm:gap-6">
        <div className="flex flex-col space-y-2">
          <Avatar className="static h-32 w-32 rounded-3xl sm:h-36 sm:w-36 md:h-48 md:w-48">
            <AvatarImage src="https://github.com/joaogf03.png" alt="@joaogf" />
            <AvatarFallback className="sm:tx-5xl rounded-3xl font-anta text-xl md:text-9xl">
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
          <h1 className="font-anta text-5xl font-bold md:text-6xl">
            João Guilherme Fonseca
          </h1>
          <p className="hidden whitespace-pre-line text-lg md:flex md:text-xl lg:w-4/5">
            {t("description")}
          </p>
        </div>
      </div>

      <p className="flex whitespace-pre-line text-lg md:hidden md:text-xl">
        {t("description")}
      </p>

      <article className="whitespace-pre-line text-lg md:text-2xl">
        {t("article")}
      </article>

      <div className="flex flex-col space-y-4 md:space-y-12">
        <div className="flex w-full items-end space-x-2">
          <h2 className="text-4xl md:text-6xl">{t("experience")}</h2>
          <div className="mb-4 h-px w-full bg-gradient-to-r from-slate-600 md:mb-6" />
        </div>

        <Suspense fallback={<LoadingExperiences />}>
          <Experiences />
        </Suspense>
      </div>
    </div>
  )
}

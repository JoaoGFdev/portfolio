import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Experiences, LoadingExperiences } from "./experiences"
import { useTranslations } from "next-intl"
import type { LocalePage } from "~/i18n"
import { unstable_setRequestLocale } from "next-intl/server"
import { Suspense } from "react"

export default function HomePage({ params: { locale } }: LocalePage) {
  unstable_setRequestLocale(locale)

  const t = useTranslations("portfolio")

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <div className="flex flex-col gap-2 py-12 sm:flex-row sm:gap-6 md:py-20">
        <div className="flex gap-6">
          <Avatar className="static h-28 w-28 rounded-3xl md:h-48 md:w-48">
            <AvatarImage src="https://github.com/joaogf03.png" alt="@joaogf" />
            <AvatarFallback className="rounded-3xl font-anta text-xl md:text-9xl">
              JG
            </AvatarFallback>
          </Avatar>
          <h1 className="font-anta text-4xl font-bold sm:hidden md:text-6xl">
            João Guilherme Fonseca
          </h1>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="hidden font-anta text-4xl font-bold sm:block md:text-6xl">
            João Guilherme Fonseca
          </h1>
          <p className="max-w-lg text-lg font-light leading-tight md:text-2xl">
            {t("title")}
          </p>
        </div>
      </div>

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

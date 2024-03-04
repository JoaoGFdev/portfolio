import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Experiences, LoadingExperiences } from "./experiences"
import { useTranslations } from "next-intl"
import type { LocalePage } from "~/i18n"
import { unstable_setRequestLocale } from "next-intl/server"
import { Suspense } from "react"
import { Button } from "~/components/ui/button"
import { Calendar, Mail, MapPin } from "lucide-react"

export default function HomePage({ params: { locale } }: LocalePage) {
  unstable_setRequestLocale(locale)

  const t = useTranslations("portfolio")

  return (
    <div className="flex flex-col gap-y-8 pt-12">
      <div className="flex flex-col space-y-4">
        <div className="flex gap-4 sm:gap-6">
          <div className="flex flex-col space-y-2">
            <Avatar className="static h-32 w-32 rounded-3xl sm:h-36 sm:w-36 md:h-48 md:w-48">
              <AvatarImage
                src="https://github.com/joaogf03.png"
                alt="@joaogf"
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
            <h1 className="font-anta text-5xl font-bold md:text-6xl">
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
        <div className="flex w-full items-center space-x-4">
          <h2 className="min-w-fit text-2xl font-semibold md:text-4xl">
            {t("experience")}
          </h2>
          <div className="h-px w-full bg-gradient-to-r from-slate-600" />
        </div>

        <Suspense fallback={<LoadingExperiences />}>
          <Experiences />
        </Suspense>
      </div>

      <div className="flex flex-col space-y-6 md:space-y-12">
        <div className="flex w-full items-center space-x-4">
          <h2 className="min-w-fit text-2xl font-semibold md:text-4xl">
            {t("education.title")}
          </h2>
          <div className="h-px w-full bg-gradient-to-r from-slate-600" />
        </div>

        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          <li className="pb-12">
            <article>
              <div className="flex flex-col-reverse gap-x-4 gap-y-4 lg:grid lg:grid-cols-7">
                <div className="flex h-full flex-col space-y-1 text-gray-500 dark:text-gray-400 lg:col-span-2">
                  <div className="flex h-6 items-center space-x-2">
                    <Calendar size={16} />
                    <p>{t("education.date")}</p>
                  </div>

                  <div className="flex h-6 items-center space-x-2">
                    <MapPin size={16} />
                    <p>{t("education.place")}</p>
                  </div>
                </div>

                <div className="space-y-4 lg:col-span-5">
                  <h2 className="font-cal font- text-2xl leading-8 tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl">
                    {t("education.description")}
                  </h2>

                  <p className="whitespace-pre-line">
                    Universidade Vila Velha - UVV
                  </p>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </div>
  )
}

import { Calendar, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"

export function Education() {
  const t = useTranslations("portfolio")

  return (
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
  )
}

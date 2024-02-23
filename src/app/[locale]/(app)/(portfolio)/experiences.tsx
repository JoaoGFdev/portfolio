import { Briefcase, Calendar, MapPin } from "lucide-react"
import {
  cn,
  employmentTypeMapEN,
  employmentTypeMapPT,
  locationTypeMapEN,
  locationTypeMapPT,
  getLanguage,
} from "~/lib/utils"
import { api } from "~/trpc/server"
import { Badge } from "~/components/ui/badge"
import { formatDate } from "~/lib/date"
import type { Locale } from "~/i18n"
import { useTranslations, useLocale } from "next-intl"

export async function Experiences() {
  const locale = useLocale() as Locale
  const t = useTranslations("portfolio")

  const experiences = await api.experience.getExperiences.query({
    language: getLanguage(locale),
  })

  return (
    <div className="flex flex-col space-y-4 md:space-y-12">
      <div className="flex w-full items-end space-x-2">
        <h2 className="text-4xl md:text-6xl">{t("experience")}</h2>
        <div className="mb-4 h-px w-full bg-gradient-to-r from-slate-600 md:mb-6" />
      </div>

      <ul className="divide-y divide-slate-200 dark:divide-slate-800">
        {experiences.map(
          (
            {
              id,
              startDate,
              endDate,
              skills,
              employmentType,
              locationType,
              experienceTranslation,
            },
            i,
          ) => {
            const { title, description, companyName, location } =
              experienceTranslation[0]!

            return (
              <li key={id} className={cn(i !== 0 ? "py-12" : "pb-12")}>
                <article>
                  <div className="flex flex-col-reverse gap-y-4 lg:grid lg:grid-cols-7 lg:items-baseline lg:space-y-0">
                    <div className="text-gray-500 dark:text-gray-400 lg:col-span-2">
                      <dl className="flex items-center space-x-2 ">
                        <Calendar size={16} />
                        <dt className="sr-only">
                          Started ${title} role at ${companyName} on
                        </dt>
                        <dd className="text-base font-medium leading-6 ">
                          <time dateTime={startDate.toISOString()}>
                            {formatDate(startDate, "MMM yyyy", locale)}
                          </time>
                        </dd>
                        <span className="mx-1">-</span>
                        <dt className="sr-only">
                          Ended ${title} role at ${companyName} on
                        </dt>
                        <dd className="text-base font-medium leading-6 ">
                          {endDate
                            ? formatDate(endDate, "MMM yyyy", locale)
                            : t("present")}
                        </dd>
                      </dl>
                      <div className="flex items-center space-x-2">
                        <Briefcase size={16} />
                        <p>
                          {locale === "en"
                            ? employmentTypeMapEN[employmentType]
                            : employmentTypeMapPT[employmentType]}
                          {" - "}
                          {locale === "en"
                            ? locationTypeMapEN[locationType]
                            : locationTypeMapPT[locationType]}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <p>{location}</p>
                      </div>
                    </div>

                    <div className="space-y-4 lg:col-span-5">
                      <h2 className="font-cal text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl">
                        {title} · {companyName}
                      </h2>

                      <p>{description}</p>

                      {Boolean(skills.length) && (
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <Badge key={skill.id}>{skill.name}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            )
          },
        )}
      </ul>
    </div>
  )
}

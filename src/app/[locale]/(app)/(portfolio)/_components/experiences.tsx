import { Briefcase, Calendar, MapPin } from "lucide-react"
import { useLocale } from "next-intl"
import { getTranslations } from "next-intl/server"

import { Badge } from "~/components/ui/badge"
import type { Locale } from "~/i18n"
import { formatDate } from "~/lib/date"
import {
  cn,
  employmentTypeMapEN,
  employmentTypeMapPT,
  getLanguage,
  locationTypeMapEN,
  locationTypeMapPT,
} from "~/lib/utils"
import { api } from "~/trpc/server"

export async function Experiences({ skills }: { skills?: string | string[] }) {
  const locale = useLocale() as Locale
  const t = await getTranslations("portfolio")

  const experiences = await api.experience.getExperiences({
    language: getLanguage(locale),
    skills: skills?.toString(),
  })

  return (
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
            <li
              key={id}
              className={cn(i !== 0 ? "py-6 md:py-10" : "pb-6 md:pb-10")}
            >
              <article>
                <div className="flex flex-col-reverse gap-x-4 gap-y-4 lg:grid lg:grid-cols-7">
                  <div className="flex h-full flex-col space-y-1 text-gray-500 dark:text-gray-400 lg:col-span-2">
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
                        <time dateTime={startDate.toISOString()}>
                          {endDate
                            ? formatDate(endDate, "MMM yyyy", locale)
                            : t("present")}
                        </time>
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
                    <h2 className="font-cal text-2xl font-medium leading-8 tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl">
                      {title} · {companyName}
                    </h2>

                    <p className="whitespace-pre-line">{description}</p>

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
  )
}

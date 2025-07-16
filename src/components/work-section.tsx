// import { Building2, MapPin } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Section } from "./section"

const companies = [
  "slabware",
  "beebee",
  "gmill",
  "atw",
  "uvv",
  "uvv-volunteer",
] as const
export async function WorkSection() {
  const t = await getTranslations("WorkExperienceSection")

  return (
    <Section title={t("section")}>
      {companies.map((c) => (
        <div
          key={c}
          className="space-y-4 border-b border-zinc-200 py-6 last:border-b-0 dark:border-zinc-800"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                {t(`${c}.role`)} · {t(`${c}.name`)}
              </h3>
              <div className="flex items-center justify-between gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                {t(`${c}.date`)}
                <p className="block text-right md:hidden">{t(`${c}.type`)}</p>
              </div>
            </div>
            <p className="hidden items-end space-y-1 text-sm text-zinc-600 md:block md:text-right dark:text-zinc-400">
              {t(`${c}.type`)}
            </p>
          </div>
          <div className="space-y-4">
            <div className="max-w-2xl space-y-2">
              {t(`${c}.description`)
                .split("\n")
                .map((paragraph, index) => (
                  <p key={index} className="text-zinc-800 dark:text-zinc-400">
                    {paragraph}
                  </p>
                ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {t(`${c}.skills`)
                .split(", ")
                .map((skill) => (
                  <div
                    key={skill}
                    className="cursor-default rounded-xl bg-zinc-100 px-2 py-1 text-xs dark:bg-zinc-800"
                  >
                    {skill}
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </Section>
  )
}

import { getTranslations } from "next-intl/server"

import { Section } from "./section"

export async function EducationSection() {
  const t = await getTranslations("EducationSection")

  return (
    <Section title={t("section")}>
      <div className="flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold">{t("title")}</h3>
          <p className="text-sm text-zinc-500">{t("institution")}</p>
        </div>
        <div className="space-y-1 text-sm text-zinc-500 md:text-right">
          <p>{t("date")}</p>
          <p>{t("city")}</p>
        </div>
      </div>
    </Section>
  )
}

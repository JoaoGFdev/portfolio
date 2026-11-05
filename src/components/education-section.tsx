import { getTranslations } from "next-intl/server"

import { Section } from "./section"

export async function EducationSection() {
  const t = await getTranslations("EducationSection")
  const ts = await getTranslations("Sections")

  return (
    <Section id="education" title={ts("education")}>
      <article className="pt-1">
        <h3 className="text-xl font-semibold">
          {t("title")}
          <span className="block text-lg font-normal text-blue">
            {t("institution")}
          </span>
        </h3>
        <p className="mt-2 flex flex-wrap gap-x-5 text-sm text-muted">
          <span>{t("date")}</span>
          <span>{t("city")}</span>
        </p>
      </article>
    </Section>
  )
}

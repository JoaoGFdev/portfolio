import { getTranslations } from "next-intl/server"

import { Section, Stack } from "./section"

const projects = ["playlist", "automation"] as const

export async function ProjectsSection() {
  const t = await getTranslations("ProjectsSection")
  const ts = await getTranslations("Sections")

  return (
    <Section id="projects" title={ts("projects")}>
      <div className="grid gap-10 lg:grid-cols-2">
        {projects.map((key) => (
          <article key={key}>
            <h3 className="text-xl font-semibold">{t(`${key}.name`)}</h3>
            <p className="mt-3 max-w-[60ch]">{t(`${key}.description`)}</p>
            <Stack items={t(`${key}.skills`)} />
          </article>
        ))}
      </div>
    </Section>
  )
}

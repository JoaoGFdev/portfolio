import { getTranslations } from "next-intl/server"

import { skillGroups } from "~/data/career"

import { Section } from "./section"

export async function SkillsSection() {
  const t = await getTranslations("SkillsSection")
  const ts = await getTranslations("Sections")

  return (
    <Section id="skills" title={ts("skills")}>
      <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
        {Object.entries(skillGroups).map(([group, items]) => (
          <div key={group}>
            <dt className="font-semibold">
              {t(group as keyof typeof skillGroups)}
            </dt>
            <dd className="mt-1 text-muted">{items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

import { type Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { type Role, skillGroups, work } from "~/data/career"

// Print layout for the PDF résumé (`pnpm cv`). Single column and real text so
// applicant tracking systems can parse it; always light, whatever the theme.

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Resume" })
  return {
    title: `${t("title")} | João Guilherme Fonseca`,
    robots: { index: false, follow: false },
  }
}

const contacts = [
  { href: "mailto:me@joaogf.dev", label: "me@joaogf.dev" },
  { href: "https://www.joaogf.dev", label: "joaogf.dev" },
  {
    href: "https://www.linkedin.com/in/joaogfonseca/",
    label: "linkedin.com/in/joaogfonseca",
  },
  { href: "https://github.com/JoaoGFdev", label: "github.com/JoaoGFdev" },
]

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-[14pt] mb-[5pt] border-b border-rule pb-[2pt] font-display text-[12.5pt] font-bold tracking-[-0.01em] [font-stretch:85%]">
      {children}
    </h2>
  )
}

function Bullets({ text }: { text: string }) {
  const lines = text.split("\n").filter(Boolean)
  if (!lines.every((line) => line.startsWith("- "))) {
    return <p className="mt-[3pt]">{text}</p>
  }
  return (
    <ul className="mt-[3pt] space-y-[2pt]">
      {lines.map((line) => (
        <li
          key={line}
          className="relative pl-[10pt] before:absolute before:top-[0.62em] before:left-0 before:h-px before:w-[5pt] before:bg-muted"
        >
          {line.slice(2)}
        </li>
      ))}
    </ul>
  )
}

export default async function ResumePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("Resume")
  const th = await getTranslations("Header")
  const ts = await getTranslations("Sections")
  const tw = await getTranslations("WorkExperienceSection")
  const tp = await getTranslations("ProjectsSection")
  const tk = await getTranslations("SkillsSection")
  const te = await getTranslations("EducationSection")

  const roleLine = (role: Role, withTitle: boolean) => (
    <p className="flex items-baseline justify-between gap-[8pt]">
      <span className="font-semibold">
        {withTitle ? tw(`${role.key}.role`) : null}
      </span>
      <span className="shrink-0 text-[8.5pt] text-muted tabular-nums">
        {tw(`${role.key}.date`)}
      </span>
    </p>
  )

  return (
    <div className="resume mx-auto max-w-[210mm] bg-paper px-[16mm] py-[14mm] text-[9.5pt] leading-[1.42] text-ink print:max-w-none print:p-0">
      <header>
        <h1 className="font-display text-[26pt] leading-none font-extrabold tracking-[-0.02em] [font-stretch:75%]">
          João Guilherme Fonseca
        </h1>
        <p className="mt-[4pt] text-[11.5pt] font-medium">
          {th("role")}
          <span className="font-normal text-muted"> — {th("location")}</span>
        </p>
        <ul className="mt-[4pt] flex flex-wrap gap-x-[12pt] text-[9pt]">
          {contacts.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="text-blue">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <Heading>{t("summary")}</Heading>
      <p>{th("description")}</p>

      <Heading>{ts("experience")}</Heading>
      <div className="space-y-[9pt]">
        {work.map(({ id, roles }) => {
          const [latest] = roles
          if (roles.length === 1) {
            return (
              <section key={id} className="break-inside-avoid">
                {roleLine(latest!, true)}
                <p className="text-blue">
                  {tw(`${latest!.key}.name`)}
                  <span className="text-muted">
                    {" "}
                    · {tw(`${latest!.key}.type`)} ·{" "}
                    {tw(`${latest!.key}.location`)}
                  </span>
                </p>
                <Bullets text={tw(`${latest!.key}.description`)} />
                <p className="mt-[2pt] text-[8.5pt] text-muted">
                  {tw(`${latest!.key}.skills`)}
                </p>
              </section>
            )
          }
          return (
            <section key={id} className="break-inside-avoid">
              <p className="font-semibold text-blue">
                {tw(`${latest!.key}.name`)}
                <span className="font-normal text-muted">
                  {" "}
                  · {tw(`${latest!.key}.location`)}
                </span>
              </p>
              <p className="text-muted">{tw(`transitions.${id}`)}</p>
              <div className="mt-[4pt] space-y-[5pt] border-l border-rule pl-[8pt]">
                {roles.map((role) => (
                  <div key={role.key}>
                    {roleLine(role, true)}
                    <p className="text-muted">{tw(`${role.key}.type`)}</p>
                    <Bullets text={tw(`${role.key}.description`)} />
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <Heading>{ts("projects")}</Heading>
      <div className="space-y-[6pt]">
        {(["playlist", "automation"] as const).map((key) => (
          <section key={key} className="break-inside-avoid">
            <p className="font-semibold">{tp(`${key}.name`)}</p>
            <p>{tp(`${key}.description`)}</p>
            <p className="mt-[1pt] text-[8.5pt] text-muted">
              {tp(`${key}.skills`)}
            </p>
          </section>
        ))}
      </div>

      <Heading>{ts("skills")}</Heading>
      <dl className="grid grid-cols-[auto_1fr] gap-x-[10pt] gap-y-[2pt] break-inside-avoid">
        {Object.entries(skillGroups).map(([group, items]) => (
          <div key={group} className="contents">
            <dt className="font-semibold">
              {tk(group as keyof typeof skillGroups)}
            </dt>
            <dd>{items.join(", ")}</dd>
          </div>
        ))}
      </dl>

      <Heading>{ts("education")}</Heading>
      <section className="break-inside-avoid">
        <p className="flex items-baseline justify-between gap-[8pt]">
          <span className="font-semibold">{te("title")}</span>
          <span className="shrink-0 text-[8.5pt] text-muted tabular-nums">
            {te("date")}
          </span>
        </p>
        <p className="text-blue">
          {te("institution")}
          <span className="text-muted"> · {te("city")}</span>
        </p>
      </section>
    </div>
  )
}

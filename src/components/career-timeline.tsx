import { getTranslations } from "next-intl/server"

import { education, type Role, work } from "~/data/career"

const RANGE_START = monthIndex("2018-01")

function monthIndex(value: string) {
  const [year, month] = value.split("-").map(Number)
  return year! * 12 + (month! - 1)
}

function currentMonthIndex() {
  const now = new Date()
  return now.getFullYear() * 12 + now.getMonth() + 1
}

type Row = {
  id: string
  href: string
  label: string
  detail: string
  // Oldest first, so later segments draw on top of earlier ones.
  segments: { role: Role; title: string }[]
  kind: "work" | "education"
}

export async function CareerTimeline() {
  const t = await getTranslations("Timeline")
  const tw = await getTranslations("WorkExperienceSection")
  const te = await getTranslations("EducationSection")

  const rangeEnd = currentMonthIndex()
  const span = rangeEnd - RANGE_START
  const pct = (month: number) => ((month - RANGE_START) / span) * 100
  const yearWidth = (12 / span) * 100

  const firstYear = Math.floor(RANGE_START / 12)
  const lastYear = Math.floor((rangeEnd - 1) / 12)
  const years = Array.from(
    { length: lastYear - firstYear + 1 },
    (_, i) => firstYear + i,
  )

  const rows: Row[] = [
    ...work.map(({ id, roles }) => {
      const latest = roles[0]!
      return {
        id,
        href: `#${id}`,
        label: tw(`${latest.key}.name`),
        detail: roles.length > 1 ? t("transition") : tw(`${latest.key}.role`),
        segments: [...roles]
          .reverse()
          .map((role) => ({ role, title: tw(`${role.key}.role`) })),
        kind: "work" as const,
      }
    }),
    {
      id: education.key,
      href: "#education",
      label: te("institutionShort"),
      detail: t("education"),
      segments: [{ role: education, title: te("title") }],
      kind: "education",
    },
  ]

  const gridlines = {
    backgroundImage:
      "linear-gradient(to right, var(--rule) 1px, transparent 1px)",
    backgroundSize: `${yearWidth}% 100%`,
  }

  return (
    <figure className="mt-16 md:mt-20">
      <figcaption className="sr-only">{t("caption")}</figcaption>

      <div className="grid grid-cols-[minmax(0,7.5rem)_1fr] gap-x-4 sm:grid-cols-[minmax(0,11rem)_1fr]">
        <div aria-hidden />
        <div aria-hidden className="relative h-6 text-xs text-muted tabular-nums">
          {years.map((year, i) => (
            <span
              key={year}
              className={`absolute bottom-1 pl-1 ${i % 2 === 1 ? "hidden sm:block" : ""}`}
              style={{ left: `${pct(year * 12)}%` }}
            >
              {year}
            </span>
          ))}
          <span className="absolute right-0 bottom-1 hidden font-medium text-pink sm:block">
            {t("now")}
          </span>
        </div>

        <ol className="col-span-2 grid grid-cols-subgrid">
          {rows.map(({ id, href, label, detail, segments, kind }, row) => (
            <li key={id} className="col-span-2 grid grid-cols-subgrid">
              <a
                href={href}
                className="group col-span-2 grid grid-cols-subgrid items-center py-1.5"
              >
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-sm font-medium group-hover:text-blue">
                    {label}
                  </span>
                  <span className="block truncate text-xs text-muted">
                    {detail}
                  </span>
                </span>

                <span
                  className="relative block h-9 border-l border-rule"
                  style={gridlines}
                >
                  {segments.map(({ role, title }, i) => {
                    const start = pct(monthIndex(role.start))
                    const end = role.end ? pct(monthIndex(role.end)) : 100
                    const isLatest = i === segments.length - 1
                    // Earlier roles at the same employer are drawn lighter,
                    // so a transition reads as one continuous path.
                    const fill =
                      kind === "education"
                        ? "border-2 border-blue bg-paper"
                        : role.end === null
                          ? "bg-pink"
                          : isLatest
                            ? "bg-blue"
                            : "bg-blue/35"

                    return (
                      <span
                        key={role.key}
                        title={title}
                        className={[
                          "timeline-bar absolute inset-y-0 my-auto h-3 transition-[height] group-hover:h-4",
                          segments.length === 1
                            ? "rounded-[3px]"
                            : i === 0
                              ? "rounded-l-[3px]"
                              : isLatest
                                ? "rounded-r-[3px] border-l-2 border-paper"
                                : "border-l-2 border-paper",
                          fill,
                        ].join(" ")}
                        style={
                          {
                            left: `${start}%`,
                            width: `${end - start}%`,
                            "--row": row,
                          } as React.CSSProperties
                        }
                      />
                    )
                  })}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  )
}

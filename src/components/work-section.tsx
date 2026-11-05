import { getTranslations } from "next-intl/server"

import { type Role, work } from "~/data/career"

import { Description, Section, Stack } from "./section"

type T = Awaited<ReturnType<typeof getTranslations<"WorkExperienceSection">>>

function RoleMeta({ t, role }: { t: T; role: Role }) {
  return (
    <p className="mt-2 flex flex-wrap gap-x-5 text-sm text-muted">
      <span className={role.end === null ? "font-medium text-ink" : ""}>
        {t(`${role.key}.date`)}
      </span>
      <span>{t(`${role.key}.type`)}</span>
      <span>{t(`${role.key}.location`)}</span>
    </p>
  )
}

function RoleBody({ t, role }: { t: T; role: Role }) {
  return (
    <>
      <div className="mt-4">
        <Description text={t(`${role.key}.description`)} />
      </div>
      <Stack items={t(`${role.key}.skills`)} />
    </>
  )
}

export async function WorkSection() {
  const t = await getTranslations("WorkExperienceSection")
  const ts = await getTranslations("Sections")

  return (
    <Section id="experience" title={ts("experience")}>
      <div className="divide-y divide-rule">
        {work.map(({ id, roles }) => {
          const [latest] = roles

          if (roles.length === 1) {
            return (
              <article key={id} id={id} className="py-8 first:pt-1 last:pb-0">
                <h3 className="text-xl font-semibold">
                  {t(`${latest!.key}.role`)}
                  <span className="block text-lg font-normal text-blue">
                    {t(`${latest!.key}.name`)}
                  </span>
                </h3>
                <RoleMeta t={t} role={latest!} />
                <RoleBody t={t} role={latest!} />
              </article>
            )
          }

          // Several roles at one employer: a single entry whose roles are
          // joined by a line, newest at the top, so the change reads as one path.
          return (
            <article key={id} id={id} className="py-8 first:pt-1 last:pb-0">
              <h3 className="text-xl font-semibold text-blue">
                {t(`${latest!.key}.name`)}
              </h3>
              <p className="mt-1 max-w-[65ch] text-muted">
                {t(`transitions.${id}`)}
              </p>

              <ol className="mt-6">
                {roles.map((role, i) => (
                  <li
                    key={role.key}
                    className="relative pb-8 pl-7 last:pb-0"
                  >
                    {i < roles.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute top-3 bottom-0 left-[5px] w-0.5 bg-rule"
                      />
                    )}
                    <span
                      aria-hidden
                      className={`absolute top-[0.45rem] left-0 size-3 rounded-full border-2 ${
                        i === 0
                          ? "border-blue bg-blue"
                          : "border-blue/50 bg-paper"
                      }`}
                    />
                    <h4 className="text-lg font-semibold">
                      {t(`${role.key}.role`)}
                    </h4>
                    <RoleMeta t={t} role={role} />
                    <RoleBody t={t} role={role} />
                  </li>
                ))}
              </ol>
            </article>
          )
        })}
      </div>
    </Section>
  )
}

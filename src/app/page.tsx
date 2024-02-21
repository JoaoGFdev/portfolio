import { CardContent, CardFooter, Card, CardTitle } from "~/components/ui/card"
import { type SVGProps } from "react"
import {
  type ExperienceTranslation,
  type Experience,
  type Skill,
} from "@prisma/client"
import { Badge } from "~/components/ui/badge"
import { employmentTypeMapPT } from "~/lib/utils"
import { ToggleTheme } from "~/components/toggle-theme"
import { api } from "~/trpc/server"

export default async function HomePage() {
  const experiences = await api.experience.getExperiences.query({
    language: "PT",
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-8 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
      <ToggleTheme className="absolute right-8 top-8" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} {...experience} />
        ))}
      </div>
    </main>
  )
}

function ExperienceCard({
  startDate,
  endDate,
  skills,
  employmentType,
  experienceTranslation,
}: Experience & {
  skills: Skill[]
  experienceTranslation: ExperienceTranslation[]
}) {
  if (!experienceTranslation?.[0]) return null

  const { title, description, companyName } = experienceTranslation[0]

  return (
    <Card className="flex w-full max-w-sm flex-col justify-between">
      <CardContent className="flex flex-col p-6">
        <CardTitle>{title}</CardTitle>
        {/* <div className="flex items-center gap-4">
          <h3 className="font-bold leading-none tracking-tighter">
            {companyName}
          </h3>
        </div> */}
        <div className="mt-6">
          <div className="flex space-x-2 text-sm">
            <BriefcaseIcon className="h-4 w-4 flex-shrink-0" />
            <span>
              {companyName} · {employmentTypeMapPT[employmentType]}
            </span>
          </div>
          <div className="mt-2 flex space-x-2 text-sm">
            <CalendarIcon className="h-4 w-4 flex-shrink-0" />
            <span>
              {new Date(startDate).toLocaleDateString("pt-BR", {
                month: "short",
                year: "numeric",
              })}
              {" - "}
              {endDate
                ? new Date(endDate).toLocaleDateString("pt-BR", {
                    month: "short",
                    year: "numeric",
                  })
                : "Atualmente"}
            </span>
          </div>
          <div className="mt-4">
            <p className="whitespace-pre-wrap text-sm leading-loose">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
      {Boolean(skills.length) && (
        <CardFooter className="flex flex-wrap gap-2 border-t border-slate-200 p-4 dark:border-slate-800">
          {skills.map((skill) => (
            <Badge key={skill.id}>{skill.name}</Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  )
}

function BriefcaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

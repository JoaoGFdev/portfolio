import {
  type ExperienceTranslation,
  type Experience,
  type Skill,
} from "@prisma/client"
import { Briefcase, Calendar } from "lucide-react"
import { employmentTypeMapPT } from "~/lib/utils"
import { api } from "~/trpc/server"
import { CardContent, CardFooter, Card, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"

export async function Experiences() {
  const experiences = await api.experience.getExperiences.query({
    language: "PT",
  })

  return (
    <div className="flex flex-row flex-wrap justify-center gap-4">
      {experiences.map((experience) => (
        <ExperienceCard
          key={experience.id}
          {...experience}
          experienceTranslation={experience.experienceTranslation[0]!}
        />
      ))}
    </div>
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
  experienceTranslation: ExperienceTranslation
}) {
  const { title, description, companyName } = experienceTranslation

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
            <Briefcase className="h-4 w-4 flex-shrink-0" />
            <span>
              {companyName} · {employmentTypeMapPT[employmentType]}
            </span>
          </div>
          <div className="mt-2 flex space-x-2 text-sm">
            <Calendar className="h-4 w-4 flex-shrink-0" />
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

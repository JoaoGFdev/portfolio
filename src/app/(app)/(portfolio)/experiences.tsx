import {
  type ExperienceTranslation,
  type Experience,
  type Skill,
} from "@prisma/client"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { employmentTypeMapEN } from "~/lib/utils"
import { api } from "~/trpc/server"
import { CardContent, CardFooter, Card, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { formatDate } from "~/lib/date"

export async function Experiences() {
  const experiences = await api.experience.getExperiences.query({
    language: "EN",
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
  const { title, description, companyName, location } = experienceTranslation

  return (
    <Card className="flex w-full flex-col justify-between sm:max-w-xs">
      <CardContent className="flex flex-col p-6">
        <CardTitle>{title}</CardTitle>
        <div className="mt-6 space-y-2">
          <div className="flex space-x-2 text-sm">
            <Briefcase className="h-4 w-4 flex-shrink-0" />
            <span>
              {companyName} · {employmentTypeMapEN[employmentType]}
            </span>
          </div>
          <div className="flex space-x-2 text-sm">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>
              {formatDate(startDate, "MMM yyyy")}
              {" · "}
              {endDate ? formatDate(endDate, "MMM yyyy") : "Present"}
            </span>
          </div>
          <div className="flex space-x-2 text-sm">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{location}</span>
          </div>
          <div className="pt-4">
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

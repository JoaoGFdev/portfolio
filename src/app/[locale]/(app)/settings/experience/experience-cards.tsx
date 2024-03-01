import { api } from "~/trpc/server"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

import type { RouterOutputs } from "~/trpc/shared"
import { Button } from "~/components/ui/button"
import Link from "next/link"
import { Skeleton } from "~/components/ui/skeleton"
import { formatDate } from "~/lib/date"
import { useLocale } from "next-intl"
import { type Locale } from "~/i18n"
import { auth } from "@clerk/nextjs/server"
import { canWrite } from "~/lib/roles"

export async function ExperienceCards() {
  const experiences = await api.experience.getExperiences.query({
    language: "EN",
  })

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {experiences?.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  )
}

function ExperienceCard({
  experience: { id, startDate, endDate, experienceTranslation },
}: {
  experience: RouterOutputs["experience"]["getExperiences"]["0"]
}) {
  const locale = useLocale() as Locale

  return (
    <Card className="p-4">
      <CardHeader className="flex-row items-start justify-between space-y-0 p-0">
        <CardTitle>{experienceTranslation[0]?.title}</CardTitle>
        {canWrite(auth()) && (
          <Link href={`/${locale}/settings/experience/${id}`}>
            <Button variant="secondary" size="xs">
              Edit
            </Button>
          </Link>
        )}
      </CardHeader>
      <CardContent className="space-y-2 px-0 py-4">
        <p>{experienceTranslation[0]?.companyName}</p>
        <p>{experienceTranslation[0]?.location}</p>
      </CardContent>
      <CardFooter className="justify-between p-0">
        <time dateTime={startDate.toISOString()}>
          {formatDate(startDate, "MMM yyyy", locale)}
        </time>
        {endDate && (
          <time dateTime={endDate.toISOString()}>
            {formatDate(endDate, "MMM yyyy", locale)}
          </time>
        )}
      </CardFooter>
    </Card>
  )
}

export function LoadingExperienceCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i} className="grid grid-rows-3">
          <CardHeader>
            <CardTitle className="h-8">
              <Skeleton className="h-6 w-3/4" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/2" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

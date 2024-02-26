import { Separator } from "~/components/ui/separator"
import { ExperienceForm } from "./experience-form"
import { api } from "~/trpc/server"

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const experience = await api.experience.getExperience.query({
    id: searchParams.id?.toString(),
  })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Experience</h3>
        <p className="text-muted-foreground text-sm">
          This is where you can add your work experience
        </p>
      </div>
      <Separator />
      <ExperienceForm experience={experience} />
    </div>
  )
}

import { api } from "~/trpc/server"
import { ExperienceForm } from "../_components/experience-form"

interface PageProps {
  params: { id: string }
}

export default async function EditExperiencePage({
  params: { id },
}: PageProps) {
  const experience = await api.experience.getExperience({
    id,
  })

  return <ExperienceForm experience={experience} />
}

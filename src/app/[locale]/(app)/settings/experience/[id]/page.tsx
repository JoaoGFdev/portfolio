import { api } from "~/trpc/server"
import { ExperienceForm } from "../experience-form"
import { FormButtons } from "../form-buttons"

interface PageProps {
  params: { id: string }
}

export default async function EditExperiencePage({
  params: { id },
}: PageProps) {
  const experience = await api.experience.getExperience.query({
    id,
  })

  return (
    <ExperienceForm experience={experience}>
      <FormButtons editable />
    </ExperienceForm>
  )
}

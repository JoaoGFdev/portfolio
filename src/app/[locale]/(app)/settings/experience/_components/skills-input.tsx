import { useUser } from "@clerk/nextjs"
import { useController, useFormContext } from "react-hook-form"

import { SkillInput } from "~/components/skill-input"
import { canWrite } from "~/lib/roles"
import type { ExperienceSchema } from "~/schemas/experience.schema"

export function SkillsInput() {
  const { user } = useUser()
  const { control } = useFormContext<ExperienceSchema>()

  const {
    field,
    fieldState: { error },
  } = useController({
    name: `skills`,
    control,
    defaultValue: [],
  })

  const { value, onChange } = field

  return (
    <SkillInput
      value={value}
      onValueChange={onChange}
      error={error?.message}
      allowSkillCreation={canWrite(user)}
    />
  )
}

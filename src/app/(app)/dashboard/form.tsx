"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { Label } from "~/components/ui/label"

import { SkillsInput } from "./skills"
import { toast } from "sonner"
import { type Skill } from "@prisma/client"

interface VideoFormProps {
  video: { skills: Skill[] }
}

const editVideoFormSchema = z.object({
  skills: z.array(z.string()).min(1, {
    message: "At least one tag is required.",
  }),
})

export type EditVideoFormSchema = z.infer<typeof editVideoFormSchema>

export function VideoForm({ video }: VideoFormProps) {
  const editVideoForm = useForm<EditVideoFormSchema>({
    resolver: zodResolver(editVideoFormSchema),
    defaultValues: {
      skills: video.skills.map(({ name }) => name),
    },
  })

  async function handleSaveVideo(data: EditVideoFormSchema) {
    try {
      // await updateVideo(data)
    } catch {
      toast("Uh oh! Something went wrong.", {
        description: `An error ocurred while trying to save the video.`,
      })
    }
  }

  const { handleSubmit } = editVideoForm

  return (
    <FormProvider {...editVideoForm}>
      <form onSubmit={handleSubmit(handleSaveVideo)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="commit">Tags</Label>
          <SkillsInput />
        </div>
      </form>
    </FormProvider>
  )
}

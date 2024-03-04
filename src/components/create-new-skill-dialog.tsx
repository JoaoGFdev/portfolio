import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "./ui/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { api } from "~/trpc/react"

const newSkillFormSchema = z.object({
  name: z.string({
    required_error: "The skill name is required.",
  }),
})

type NewSkillFormSchema = z.infer<typeof newSkillFormSchema>

interface CreateNewSkillDialogProps {
  onRequestClose: () => void
}

export function CreateNewSkillDialog({
  onRequestClose,
}: CreateNewSkillDialogProps) {
  const utils = api.useUtils()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<NewSkillFormSchema>({
    resolver: zodResolver(newSkillFormSchema),
    defaultValues: {
      name: "",
    },
  })

  const { mutateAsync: createSkill } = api.skill.create.useMutation({
    onSuccess() {
      void utils.skill.getSkills.invalidate()
    },
  })

  async function handleCreateSkill({ name }: NewSkillFormSchema) {
    try {
      await createSkill({ name })

      reset()
      onRequestClose()
    } catch (err) {
      toast("Uh oh! Something went wrong.", {
        description: `An error ocurred while trying to create the skill. Maybe you're trying to create a duplicated skill.`,
      })
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create new skill</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateSkill)} className="w-full">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-baseline gap-4">
            <Label htmlFor="skill" className="text-right">
              New skill
            </Label>
            <div className="col-span-3 space-y-4">
              <Input id="skill" disabled={isSubmitting} {...register("name")} />
              {errors.name && (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="flex-row justify-end gap-2">
          <DialogTrigger asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogTrigger>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

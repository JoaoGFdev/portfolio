"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button, buttonVariants } from "~/components/ui/button"
import { DatePicker } from "~/components/ui/date-picker"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Textarea } from "~/components/ui/textarea"
import { useCanWrite } from "~/hooks/useCanWrite"
import { cn, employmentTypeMapEN, locationTypeMapEN } from "~/lib/utils"
import {
  type ExperienceSchema,
  experienceSchema,
} from "~/schemas/experience.schema"
import type { RouterOutputs } from "~/server/api/root"
import { api } from "~/trpc/react"

import { SkillsInput } from "./skills-input"

export function ExperienceForm({
  experience,
}: {
  experience?: RouterOutputs["experience"]["getExperience"]
}) {
  const locale = useLocale()
  const router = useRouter()
  const canSubmit = useCanWrite()

  const form = useForm<ExperienceSchema>({
    resolver: zodResolver(experienceSchema),
    defaultValues: experience
      ? {
          language: experience.experienceTranslation.sort((a) =>
            a.language === "PT" ? -1 : 1,
          ),
          startDate: experience.startDate,
          endDate: experience.endDate,
          employmentType: experience.employmentType,
          locationType: experience.locationType,
          skills: experience.skills.map((skill) => skill.name),
        }
      : {
          language: [
            {
              language: "PT",
              companyName: "",
              description: "",
              location: "",
              title: "",
            },
            {
              language: "EN",
              companyName: "",
              description: "",
              location: "",
              title: "",
            },
          ],
        },
  })

  const { handleSubmit, register, control, reset } = form

  const { mutate: create } = api.experience.create.useMutation()
  const { mutate: update } = api.experience.update.useMutation()

  async function handleForm(data: ExperienceSchema) {
    try {
      if (experience)
        update(
          {
            id: experience.id,
            experience: data,
          },
          {
            onSuccess: () => {
              toast("Experience updated successfully!")

              router.push(`/${locale}/settings/experience`)
            },
            onError: (err) => {
              if (err.data?.code === "FORBIDDEN") {
                return toast("You don't have permission to do this", {
                  description: `You don't have permission to update an experience.`,
                })
              }

              if (err.data?.code === "UNAUTHORIZED") {
                return toast("You need to be logged in", {
                  description: `You need
                  to be logged in to update an experience.`,
                })
              }

              toast("Uh oh! Something went wrong.", {
                description: `An error ocurred, please try again.`,
              })
            },
          },
        )
      else
        create(data, {
          onSuccess: () => {
            reset()

            toast("Experience created successfully!", {
              description: `Experience has been created successfully.`,
            })
          },
          onError: (err) => {
            if (err.data?.code === "FORBIDDEN") {
              return toast("You don't have permission to do this", {
                description: `You don't have permission to create an experience.`,
              })
            }

            if (err.data?.code === "UNAUTHORIZED") {
              return toast("You need to be logged in", {
                description: `You need
                to be logged in to create an experience.`,
              })
            }

            toast("Uh oh! Something went wrong.", {
              description: `An error ocurred, please try again.`,
            })
          },
        })
    } catch {
      toast("Uh oh! Something went wrong.", {
        description: `An error ocurred, please try again.`,
      })
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(handleForm)} className="space-y-6">
        <div className="flex space-x-4">
          <FormField
            control={control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Started date</FormLabel>
                <FormControl>
                  <DatePicker
                    initialDate={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End date</FormLabel>
                <FormControl>
                  <DatePicker
                    initialDate={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="employmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Type </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(employmentTypeMapEN).map((key) => {
                      return (
                        <SelectItem key={key} value={key}>
                          {/* @ts-expect-error - it's fine */}
                          {employmentTypeMapEN[key]}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="locationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location Type </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(locationTypeMapEN).map((key) => {
                      return (
                        <SelectItem key={key} value={key}>
                          {/* @ts-expect-error - it's fine */}
                          {locationTypeMapEN[key]}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Tabs defaultValue="PT">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pb-4">
            <TabsList>
              <TabsTrigger value="PT">Português</TabsTrigger>
              <TabsTrigger value="EN">English</TabsTrigger>
            </TabsList>

            <SkillsInput />
          </div>

          <TabsContent value="PT" className="mt-2 flex flex-col space-y-6">
            <FormField
              control={control}
              name="language.0.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...register("language.0.title")}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="language.0.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      {...register("language.0.description")}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-4">
              <FormField
                control={control}
                name="language.0.companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input
                        {...register("language.0.companyName")}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="language.0.location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        {...register("language.0.location")}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="EN" className="mt-0 flex flex-col space-y-6">
            <FormField
              control={control}
              name="language.1.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...register("language.1.title")}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="language.1.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      {...register("language.1.description")}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-4">
              <FormField
                control={control}
                name="language.1.companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input
                        {...register("language.1.companyName")}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="language.1.location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        {...register("language.1.location")}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex w-full justify-end gap-4">
          <div className="flex w-full justify-end gap-4">
            <Link
              href={`/${locale}/settings/experience`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full sm:w-44",
              )}
            >
              Cancel
            </Link>
            <Button
              className="w-full sm:w-44"
              type="submit"
              disabled={!canSubmit}
            >
              {Boolean(experience) ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

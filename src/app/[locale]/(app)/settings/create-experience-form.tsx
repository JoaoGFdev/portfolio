"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { api } from "~/trpc/react"
import { SkillsInput } from "./skills"
import {
  type CreateExperienceSchema,
  createExperienceSchema,
} from "~/schemas/experience.schema"
import { Input } from "~/components/ui/input"
import { DatePicker } from "~/components/ui/date-picker"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { employmentTypeMapEN, locationTypeMapEN } from "~/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Button } from "~/components/ui/button"

export function CreateExperience() {
  const utils = api.useUtils()

  const form = useForm<CreateExperienceSchema>({
    resolver: zodResolver(createExperienceSchema),
    defaultValues: {
      language: [{ language: "PT" }, { language: "EN" }],
    },
  })
  const { handleSubmit, register, control, reset } = form

  const { mutate } = api.experience.create.useMutation()

  async function handleCreateExperience(data: CreateExperienceSchema) {
    try {
      mutate(data, {
        onSuccess: () => {
          reset()

          void utils.experience.getExperiences.invalidate()

          toast("Experience created successfully!", {
            description: `Experience has been created successfully.`,
          })
        },
      })
    } catch {
      toast("Uh oh! Something went wrong.", {
        description: `An error ocurred while trying to create the experience.`,
      })
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(handleCreateExperience)}
        className="space-y-6"
      >
        <div className="flex space-x-4">
          <FormField
            control={control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Started date</FormLabel>
                <FormControl>
                  <DatePicker onChange={field.onChange} />
                </FormControl>
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
                  <DatePicker onChange={field.onChange} />
                </FormControl>
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
            <div className="flex space-x-4">
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
                      <Input
                        {...register("language.0.description")}
                        defaultValue={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="EN" className="mt-0 flex flex-col space-y-6">
            <div className="flex space-x-4">
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
                      <Input
                        {...register("language.1.description")}
                        defaultValue={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
        </Tabs>

        <Button className="w-full sm:w-44" type="submit">
          Save
        </Button>
      </form>
    </FormProvider>
  )
}

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
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
import { employmentTypeMapEN, locationTypeMapEn } from "~/lib/utils"
import { Label } from "~/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Button } from "~/components/ui/button"

export function CreateExperience() {
  const form = useForm<CreateExperienceSchema>({
    resolver: zodResolver(createExperienceSchema),
    defaultValues: {
      language: [{ language: "PT" }, { language: "EN" }],
    },
  })

  const { mutate } = api.experience.create.useMutation()

  async function handleCreateExperience(data: CreateExperienceSchema) {
    try {
      mutate(data)
    } catch {
      toast("Uh oh! Something went wrong.", {
        description: `An error ocurred while trying to create the experience.`,
      })
    }
  }

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = form

  const { fields } = useFieldArray({
    control,
    name: "language",
  })

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(handleCreateExperience)}
        className="space-y-4"
      >
        <div className="flex flex-row flex-wrap gap-4">
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
        <div className="flex flex-row flex-wrap gap-4">
          <FormField
            control={form.control}
            name="employmentType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Employment Type </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="md:w-72">
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
              <FormItem className="w-full">
                <FormLabel>Location Type </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="md:w-72">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(locationTypeMapEn).map((key) => {
                      return (
                        <SelectItem key={key} value={key}>
                          {/* @ts-expect-error - it's fine */}
                          {locationTypeMapEn[key]}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>Skills</Label>
          <SkillsInput />
        </div>

        {/* <div>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex flex-row flex-wrap gap-4">
                <FormField
                  control={control}
                  name={`language.${index}.language`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Input
                          {...register(`language.${index}.language`)}
                          defaultValue={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`language.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          {...register(`language.${index}.description`)}
                          defaultValue={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )
          })}
        </div> */}
        <Tabs defaultValue="PT" className="w-full">
          <TabsList>
            <TabsTrigger value="PT">Português</TabsTrigger>
            <TabsTrigger value="EN">English</TabsTrigger>
          </TabsList>
          <TabsContent value="PT" className="mt-2 flex flex-col gap-4">
            <div className="flex flex-row flex-wrap gap-4">
              <FormField
                control={control}
                name="language.0.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-72"
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
                        className="md:w-72"
                        {...register("language.0.description")}
                        defaultValue={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              <FormField
                control={control}
                name="language.0.companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-72"
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
                        className="md:w-72"
                        {...register("language.0.location")}
                        defaultValue={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          <TabsContent value="EN" className="mt-0 flex flex-col gap-4">
            <div className="flex flex-row flex-wrap gap-4">
              <FormField
                control={control}
                name="language.1.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-72"
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
                        className="md:w-72"
                        {...register("language.1.description")}
                        defaultValue={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              <FormField
                control={control}
                name="language.1.companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-72"
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
                        className="md:w-72"
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

        <Button type="submit">Salvar</Button>
      </form>
    </FormProvider>
  )
}

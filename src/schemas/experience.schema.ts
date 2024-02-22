import {
  type Language,
  type EmploymentType,
  type LocationType,
} from "@prisma/client"
import { z } from "zod"

export const employmentType: z.ZodType<EmploymentType> = z.enum([
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
  "FREELANCE",
  "APPRENTICESHIP",
  "LEADERSHIP",
  "INDIRECT_CONTRACT",
  "VOLUNTEER",
])

export const locationType: z.ZodType<LocationType> = z.enum([
  "REMOTE",
  "HYBRID",
  "ONSITE",
])

export const language: z.ZodType<Language> = z.enum(["PT", "EN"])

export const createExperienceSchema = z.object({
  language: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        companyName: z.string(),
        language: language,
        location: z.string(),
      }),
    )
    .min(1),
  // Shared attributes
  skills: z.array(z.string()),
  employmentType: employmentType,
  locationType: locationType,
  startDate: z.date(),
  endDate: z.date().optional(),
})

export type CreateExperienceSchema = z.infer<typeof createExperienceSchema>

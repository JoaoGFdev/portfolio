import {
  type EmploymentType,
  type LocationType,
  type Language,
} from "@prisma/client"
import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

const employmentType: z.ZodType<EmploymentType> = z.enum([
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
  "FREELANCE",
])

const locationType: z.ZodType<LocationType> = z.enum([
  "REMOTE",
  "HYBRID",
  "ONSITE",
])

const language: z.ZodType<Language> = z.enum(["PT", "EN"])

const createExperience = z.object({
  language: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        companyName: z.string(),
        language: language,
        location: z.object({
          city: z.string(),
          state: z.string(),
          country: z.string(),
        }),
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

export const experienceRouter = createTRPCRouter({
  create: publicProcedure
    .input(createExperience)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.experience.create({
        data: {
          experienceTranslation: {
            createMany: {
              data: input.language.map(
                ({ companyName, description, language, title, location }) => ({
                  title: title,
                  description: description,
                  companyName: companyName,
                  language: language,
                  location: `${location.city}, ${location.state}, ${location.country}`,
                }),
              ),
            },
          },
          startDate: input.startDate,
          endDate: input.endDate,
          employmentType: input.employmentType,
          locationType: input.locationType,
          skills: {
            connect: input.skills.map((name) => ({
              name,
            })),
          },
        },
      })
    }),
  getExperiences: publicProcedure
    .input(
      z.object({
        language: language,
      }),
    )
    .query(async ({ ctx, input }) => {
      const { language } = input

      return ctx.db.experience.findMany({
        where: {
          experienceTranslation: {
            some: {
              language,
            },
          },
        },
        include: {
          skills: {
            orderBy: {
              name: "asc",
            },
          },
          experienceTranslation: {
            where: {
              language,
            },
          },
        },
        orderBy: {
          startDate: "desc",
        },
      })
    }),
})

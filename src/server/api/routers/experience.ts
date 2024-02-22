import { z } from "zod"
import { createExperienceSchema, language } from "~/schemas/experience.schema"

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const experienceRouter = createTRPCRouter({
  create: publicProcedure
    .input(createExperienceSchema)
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
                  location: location,
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
        select: {
          id: true,
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

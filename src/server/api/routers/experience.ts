import { z } from "zod"

import { experienceSchema, language } from "~/schemas/experience.schema"
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc"

export const experienceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(experienceSchema)
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
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        experience: experienceSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, experience } = input

      await ctx.db.experienceTranslation.deleteMany({
        where: {
          experienceId: id,
        },
      })

      return ctx.db.experience.update({
        where: {
          id,
        },
        data: {
          experienceTranslation: {
            createMany: {
              data: experience.language,
            },
          },
          startDate: experience.startDate,
          endDate: experience.endDate,
          employmentType: experience.employmentType,
          locationType: experience.locationType,
          skills: {
            set: experience.skills.map((name) => ({
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
        skills: z
          .string()
          .optional()
          .transform((skills) => {
            if (skills === undefined) return []

            return skills.split(",")
          }),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { language, skills } = input

      return ctx.db.experience.findMany({
        where: {
          experienceTranslation: {
            some: {
              language,
            },
          },
          AND: skills?.map((name) => ({
            skills: {
              some: {
                name,
              },
            },
          })),
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
  getExperience: publicProcedure
    .input(
      z.object({
        id: z
          .string()
          .optional()
          .transform((id) => {
            if (id === undefined) return null

            return Number(id)
          }),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input

      if (id === null) return null

      return ctx.db.experience.findUnique({
        where: {
          id,
        },
        include: {
          skills: true,
          experienceTranslation: true,
        },
      })
    }),
})

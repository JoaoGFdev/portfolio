import { z } from "zod"

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc"

export const skillRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.skill.create({
        data: {
          name: input.name,
        },
      })
    }),
  getSkills: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        take: z.number().default(20),
        searchUsedSkills: z.boolean().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      const { search, take, searchUsedSkills } = input

      return ctx.db.skill.findMany({
        where: {
          name: {
            contains: search,
            mode: "insensitive",
          },

          experiences: searchUsedSkills
            ? {
                some: {
                  id: {
                    gt: 0,
                  },
                },
              }
            : undefined,
        },
        take: take,
      })
    }),
})

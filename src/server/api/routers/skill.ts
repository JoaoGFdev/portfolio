import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const skillRouter = createTRPCRouter({
  create: publicProcedure
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
      }),
    )
    .query(({ ctx, input }) => {
      const { search, take } = input

      return ctx.db.skill.findMany({
        where: {
          name: {
            contains: search,
          },
        },
        take: take,
      })
    }),
})

import { skillRouter } from "~/server/api/routers/skill"
import { experienceRouter } from "~/server/api/routers/experience"
import { createTRPCRouter } from "~/server/api/trpc"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  skill: skillRouter,
  experience: experienceRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

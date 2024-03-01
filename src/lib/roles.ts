import type { auth } from "@clerk/nextjs/server"
import { z } from "zod"

const role = z.literal("me").or(z.literal("write")).optional()

const roleFromAuth = z
  .object({
    metadata: z.object({
      role: role,
    }),
  })
  .transform((data) => data.metadata.role)

type Auth = ReturnType<typeof auth>

export function canWrite({ sessionClaims }: Auth) {
  const role = roleFromAuth.safeParse(sessionClaims)

  return role.success && role.data === "write"
}

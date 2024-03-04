import type { auth } from "@clerk/nextjs/server"
import { z } from "zod"
import type { useUser } from "@clerk/nextjs"

const role = z.literal("me").or(z.literal("write")).optional()

const roleFromAuth = z
  .object({
    metadata: z.object({
      role: role,
    }),
  })
  .or(
    z.object({
      publicMetadata: z.object({
        role: role,
      }),
    }),
  )
  .optional()
  .transform((data) => {
    if (!data) return undefined

    if ("metadata" in data) return data.metadata.role

    return data.publicMetadata.role
  })

type Auth = ReturnType<typeof auth>
type UserResource = ReturnType<typeof useUser>

export function canWrite(
  sessionClaims: Auth["sessionClaims"] | UserResource["user"],
) {
  const role = roleFromAuth.safeParse(sessionClaims)

  return role.success && (role.data === "write" || role.data === "me")
}

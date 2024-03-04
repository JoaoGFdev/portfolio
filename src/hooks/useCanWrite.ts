import { useUser } from "@clerk/nextjs"

import { canWrite } from "~/lib/roles"

export function useCanWrite() {
  const { user } = useUser()

  return canWrite(user)
}

"use client"
import { useSignIn, useSession } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"

export function Logo() {
  const { signIn } = useSignIn()
  const { isSignedIn } = useSession()
  const path = usePathname()

  return (
    <Link
      href="/"
      className={cn(
        "-ml-4",
        path === "/en" || path === "/pt"
          ? isSignedIn
            ? "pointer-events-none"
            : "cursor-pointer"
          : "cursor-pointer",
      )}
      onDoubleClick={() => {
        !isSignedIn &&
          void signIn?.authenticateWithRedirect({
            strategy: "oauth_github",
            redirectUrlComplete: "/",
            redirectUrl: "/",
          })
      }}
    >
      <Button
        className="pb-2 pt-1 font-anta text-xl font-bold lg:pb-4 lg:pt-3 lg:text-3xl"
        variant="ghost"
      >
        joaogf
      </Button>
    </Link>
  )
}

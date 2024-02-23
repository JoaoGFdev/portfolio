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
        path === "/"
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
        className="font-anta pb-4 pt-3 text-3xl font-bold"
        variant="ghost"
      >
        joaogf
      </Button>
    </Link>
  )
}

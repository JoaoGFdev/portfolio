"use client"

import { SignInButton, useSession } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale } from "next-intl"

import { Button } from "~/components/ui/button"

// Accepts all props from the SignInButton component
function Btn({ ...props }) {
  return (
    <Button
      className="-ml-4 pb-2 pt-1 font-anta text-xl font-bold lg:pb-4 lg:pt-3 lg:text-3xl"
      variant="ghost"
      {...props}
    >
      joaogf
    </Button>
  )
}

export function Logo() {
  const locale = useLocale()
  const { isLoaded } = useSession()
  const path = usePathname()

  if (path !== `/${locale}` || !isLoaded)
    return (
      <Link href={`/${locale}`}>
        <Btn />
      </Link>
    )

  return (
    <SignInButton mode="modal">
      <Btn />
    </SignInButton>
  )
}

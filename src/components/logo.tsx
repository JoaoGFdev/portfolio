"use client"

import { SignInButton, useSession } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale } from "next-intl"

import { Button } from "~/components/ui/button"

function Btn({ ...props }) {
  return (
    <Button
      className="-ml-4 pb-2 pt-1 font-anta text-3xl font-bold lg:pb-4 lg:pt-3 "
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

  if ((path === "/" || path === `/${locale}`) && isLoaded)
    return (
      <SignInButton mode="modal">
        <Btn />
      </SignInButton>
    )

  return (
    <Link href={`/${locale}`}>
      <Btn />
    </Link>
  )
}

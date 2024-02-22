import { SignedIn, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { checkUser } from "~/lib/utils"
import { Logo } from "./logo"
import { ToggleTheme } from "~/components/toggle-theme"

export async function Header() {
  const isMe = await checkUser()

  return (
    <header className="sticky top-0 flex items-center justify-between bg-slate-100 p-2 dark:bg-slate-900">
      <div className="flex items-center">
        <Logo />
      </div>

      <div className="flex flex-row items-center space-x-4">
        <SignedIn>
          {isMe && (
            <Link href="/dashboard">
              <Button variant="link">Dashboard</Button>
            </Link>
          )}
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <ToggleTheme />
      </div>
    </header>
  )
}

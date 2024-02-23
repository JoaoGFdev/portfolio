import { SignedIn, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button, buttonVariants } from "~/components/ui/button"
import { checkUser } from "~/lib/utils"
import { Logo } from "./logo"
import { ToggleTheme } from "~/components/toggle-theme"
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"

export async function Header() {
  const isMe = await checkUser()

  return (
    <header className="sticky top-0 flex items-center justify-between bg-slate-100 p-2 dark:bg-slate-900">
      <div className="flex items-center">
        <Logo />
      </div>

      <div className="flex flex-row items-center space-x-4">
        <nav className="flex items-center space-x-1">
          <SignedIn>
            {isMe && (
              <Link href="/dashboard">
                <Button variant="link">Dashboard</Button>
              </Link>
            )}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <Link
            href="https://www.linkedin.com/in/joaogfonseca"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              size: "icon",
              variant: "ghost",
            })}
          >
            <LinkedInLogoIcon className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>

          <Link
            href="https://github.com/JoaoGF03"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              size: "icon",
              variant: "ghost",
            })}
          >
            <GitHubLogoIcon className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>

          <ToggleTheme />
        </nav>
      </div>
    </header>
  )
}

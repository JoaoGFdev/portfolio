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
    <header className="sticky top-0 flex w-full border-b border-neutral-400 bg-slate-200 dark:border-slate-500 dark:bg-black">
      <div className="container flex py-2">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="flex flex-1 justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <SignedIn>
              {isMe && (
                <Link href="/settings">
                  <Button variant="link">Settings</Button>
                </Link>
              )}
              <UserButton afterSignOutUrl="/" />
              <span className="w-1" />
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
      </div>
    </header>
  )
}

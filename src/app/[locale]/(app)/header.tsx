import { SignedIn, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button, buttonVariants } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { Logo } from "../../../components/logo"
import { ToggleTheme } from "~/components/toggle-theme"
import {
  GitHubLogoIcon,
  HamburgerMenuIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons"
import { ToggleLocale } from "~/components/toggle-locale"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { useLocale } from "next-intl"

export async function Header() {
  const locale = useLocale()
  return (
    <header className="sticky top-0 flex w-full border-b border-neutral-400 bg-white dark:border-slate-500 dark:bg-slate-950">
      <div className="container flex py-2">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="flex flex-1 justify-end space-x-4">
          <MobileMenu />
          <nav className="hidden items-center space-x-1 sm:flex">
            <Link href={`/${locale}/settings/experience`}>
              <Button variant="link">Settings</Button>
            </Link>

            <SignedIn>
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

            <ToggleLocale />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default async function MobileMenu() {
  return (
    <Popover>
      <PopoverTrigger className="block sm:hidden" asChild>
        <Button
          aria-label="Open menu"
          id="mobile-menu"
          size="icon"
          variant="ghost"
        >
          <HamburgerMenuIcon className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-full p-4" side="bottom">
        <nav className="flex flex-col space-y-2">
          <Link
            href="https://www.linkedin.com/in/joaogfonseca"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "flex w-full justify-start space-x-2",
            )}
          >
            <LinkedInLogoIcon className="h-6 w-6" />
            <span>LinkedIn</span>
          </Link>

          <Link
            href="https://github.com/JoaoGF03"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "flex w-full justify-start space-x-2",
            )}
          >
            <GitHubLogoIcon className="h-6 w-6" />
            <span>GitHub</span>
          </Link>

          <div className="flex justify-between px-2">
            <ToggleTheme />

            <ToggleLocale />
          </div>

          <SignedIn>
            <div className="pl-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <Link href="/settings">
            <Button variant="link">Settings</Button>
          </Link>
        </nav>
      </PopoverContent>
    </Popover>
  )
}

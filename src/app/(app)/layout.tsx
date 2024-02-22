import { type PropsWithChildren } from "react"
import { ToggleTheme } from "~/components/toggle-theme"
import { Clerk } from "./clerk"
import Link from "next/link"
import { Button } from "~/components/ui/button"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 flex-col gap-4 font-sans antialiased">
      <header className="sticky top-0 flex items-center justify-between bg-slate-100 p-2 dark:bg-slate-900">
        <div className="flex items-center">
          <Link href="/">
            <Button
              className="font-anta pb-4 pt-3 text-3xl font-bold"
              variant="ghost"
            >
              joaogf
            </Button>
          </Link>
        </div>

        <div className="flex flex-row items-center space-x-4">
          <Clerk />
          <ToggleTheme />
        </div>
      </header>
      {children}
    </div>
  )
}

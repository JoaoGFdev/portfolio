import { type PropsWithChildren } from "react"
import { ToggleTheme } from "~/components/toggle-theme"
import { Clerk } from "./clerk"
import Link from "next/link"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 flex-col gap-4 px-8 py-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="ml-2 text-2xl font-bold">Joaogf</h1>
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

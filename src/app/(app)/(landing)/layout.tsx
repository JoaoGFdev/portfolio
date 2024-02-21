import { type PropsWithChildren } from "react"
import { ToggleTheme } from "~/components/toggle-theme"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <header className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="ml-2 text-2xl font-bold">Joaogf</h1>
        </div>

        <ToggleTheme />
      </header>
      <div className="flex">
        <div className="h-px w-full rounded-l-full bg-gradient-to-l from-slate-600 from-50% to-slate-300/5" />
        <div className="h-px w-full rounded-r-full bg-gradient-to-r from-slate-600 from-50% to-slate-300/5" />
      </div>
      {children}
    </>
  )
}

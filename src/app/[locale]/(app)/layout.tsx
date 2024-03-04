import { type PropsWithChildren } from "react"

import { TailwindIndicator } from "~/components/tailwind-indicator"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="container flex-col font-sans antialiased">
      <main className="flex flex-1 flex-col">{children}</main>
      <TailwindIndicator />
    </div>
  )
}

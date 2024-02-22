import { type PropsWithChildren } from "react"
import { Header } from "./header"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 flex-col font-sans antialiased">
      <Header />
      <main className="flex flex-1 flex-col px-8 pb-4">{children}</main>
    </div>
  )
}

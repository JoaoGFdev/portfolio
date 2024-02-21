import { type PropsWithChildren } from "react"

export default async function AppLayout({ children }: PropsWithChildren) {
  return (
      <div className="flex flex-1 flex-col gap-4 px-8 py-4">{children}</div>
  )
}

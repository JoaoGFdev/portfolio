import { type PropsWithChildren } from "react"

export function Section({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <section>
      <h2 className="flex items-center gap-2 text-2xl font-bold">
        <div className="h-3 w-3 rounded-full bg-purple-500" /> {title}
      </h2>
      {children}
    </section>
  )
}
import { type PropsWithChildren } from "react"
import { TailwindIndicator } from "~/components/tailwind-indicator"
import { ScrollArea } from "~/components/ui/scroll-area"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="container px-0 font-sans antialiased">
      <main className="flex flex-1 flex-col p-1">
        <ScrollArea className="mr-4 h-[calc(100vh-4.25rem)] w-full px-7">
          {children}
        </ScrollArea>
      </main>
      <TailwindIndicator />
    </div>
  )
}

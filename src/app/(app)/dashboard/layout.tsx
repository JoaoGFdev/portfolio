import { type PropsWithChildren } from "react"
import { redirect } from "next/navigation"
import { checkUser } from "~/lib/utils"

export const metadata = {
  title: "Joaogf - Dashboard",
  description: "Dashboard of Joaogf's website",
}

export default async function Layout({ children }: PropsWithChildren) {
  const isMe = await checkUser()

  if (!isMe) {
    redirect("/")
  }

  return <>{children}</>
}

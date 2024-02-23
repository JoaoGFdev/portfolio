import { redirect } from "next/navigation"
import { checkUser } from "~/lib/utils"
import { Separator } from "~/components/ui/separator"
import { SidebarNav } from "./sidebar-nav"
import type { LocaleParams } from "~/i18n"
import { unstable_setRequestLocale } from "next-intl/server"

export const metadata = {
  title: "Joaogf - Settings",
  description: "Settings of Joaogf's website",
}

export default async function SettingsLayout({
  children,
  params: { locale },
}: LocaleParams) {
  unstable_setRequestLocale(locale)

  const sidebarNavItems = [
    {
      title: "Experience",
      href: `/${locale}/settings`,
    },
    // {
    //   title: "Skill",
    //   href: `/${locale}/settings/skill`,
    // },
  ]

  const isMe = await checkUser()

  if (!isMe) {
    redirect("/")
  }

  return (
    <div className="space-y-6 py-8">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your portfolio settings</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  )
}

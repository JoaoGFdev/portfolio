import { unstable_setRequestLocale } from "next-intl/server"

import { Separator } from "~/components/ui/separator"
import type { LocaleLayout } from "~/i18n"

import { SidebarNav } from "./sidebar-nav"

export const metadata = {
  title: "Joaogf - Settings",
}

export default async function SettingsLayout({
  children,
  params: { locale },
}: LocaleLayout) {
  unstable_setRequestLocale(locale)

  return (
    <div className="space-y-6 py-8">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your portfolio settings</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav
            items={[
              {
                title: "Experience",
                href: `/${locale}/settings/experience`,
              },
              {
                title: "Skill",
                href: `/${locale}/settings/skill`,
              },
            ]}
          />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

import Link from "next/link"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { type LocaleLayout } from "~/i18n"

export default function ExperienceLayout({
  children,
  params: { locale },
}: LocaleLayout) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Experience</h3>
          <p className="text-muted-foreground text-sm">
            This is where you can manage your work experience
          </p>
        </div>

        <Link href={`/${locale}/settings/experience/create`}>
          <Button variant="default">Add Experience</Button>
        </Link>
      </div>

      <Separator />

      {children}
    </div>
  )
}

import { Separator } from "~/components/ui/separator"
import { CreateExperience } from "./create-experience-form"

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Experience</h3>
        <p className="text-muted-foreground text-sm">
          This is where you can add your work experience
        </p>
      </div>
      <Separator />
      <CreateExperience />
    </div>
  )
}

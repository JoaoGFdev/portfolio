import { Separator } from "~/components/ui/separator"

export default async function SkillPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Skills</h3>
        <p className="text-muted-foreground text-sm">
          This is where you can add your skills
        </p>
      </div>
      <Separator />
    </div>
  )
}

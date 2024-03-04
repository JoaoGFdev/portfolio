import { Badge } from "~/components/ui/badge"
import { Separator } from "~/components/ui/separator"
import { api } from "~/trpc/server"

export default async function SkillPage() {
  const data = await api.skill.getSkills({
    take: 100,
  })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Skills</h3>
        <p className="text-muted-foreground text-sm">
          This is where you can manage your skills
        </p>
      </div>
      <Separator />

      <div className="flex flex-wrap gap-2">
        {data?.map((skill) => (
          <Badge key={skill.id} className="text-sm">
            {skill.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}

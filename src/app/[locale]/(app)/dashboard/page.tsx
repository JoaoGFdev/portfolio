import { CreateExperience } from "./create-experience-form"

export default async function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col items-center gap-y-8">
      <CreateExperience />
    </div>
  )
}

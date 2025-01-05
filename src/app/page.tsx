import { EducationSection } from "~/components/education-section"
import { Header } from "~/components/header"
import { WorkSection } from "~/components/work-section"

export default function Page() {
  return (
    <>
      <Header />
      <main className="space-y-8">
        <WorkSection />
        <EducationSection />
      </main>
    </>
  )
}

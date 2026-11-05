import { setRequestLocale } from "next-intl/server"

import { CareerTimeline } from "~/components/career-timeline"
import { EducationSection } from "~/components/education-section"
import { Footer } from "~/components/footer"
import { Header } from "~/components/header"
import { ProjectsSection } from "~/components/projects-section"
import { SkillsSection } from "~/components/skills-section"
import { WorkSection } from "~/components/work-section"

// The timeline is measured up to "today", so refresh the static page daily.
export const revalidate = 86400

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 md:py-10">
      <Header />
      <CareerTimeline />
      <main className="mt-16 space-y-16 md:mt-24 md:space-y-20">
        <WorkSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
      </main>
      <Footer />
    </div>
  )
}

import { Suspense } from "react"
import { ExperienceCards, LoadingExperienceCards } from "./experience-cards"

export default function ExperiencePage() {
  return (
    <Suspense fallback={<LoadingExperienceCards />}>
      <ExperienceCards />
    </Suspense>
  )
}

import { Suspense } from "react"

import {
  ExperienceCards,
  LoadingExperienceCards,
} from "./_components/experience-cards"

export default function ExperiencePage() {
  return (
    <Suspense fallback={<LoadingExperienceCards />}>
      <ExperienceCards />
    </Suspense>
  )
}

import { Suspense } from "react"

import type { LocalePage } from "~/i18n"

import { Experiences } from "./_components/experiences"
import { LoadingExperiences } from "./_components/loading-experience"

export default async function PortfolioPage({
  searchParams: { skills },
}: LocalePage) {
  return (
    <Suspense key={skills?.toString()} fallback={<LoadingExperiences />}>
      <Experiences skills={skills} />
    </Suspense>
  )
}

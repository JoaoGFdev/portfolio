import { GraduationCap, MapPin } from "lucide-react"

import { Section } from "./section"

export function EducationSection() {
  return (
    <Section title="Education">
      <div className="flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            Bachelor&apos;s degree in Computer Science
          </h3>
          <p className="text-sm text-zinc-500">Universidade Vila Velha - UVV</p>
        </div>
        <div className="space-y-1 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Jan 2018 - Dec 2023</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Vila Velha, ES, Brazil</span>
          </div>
        </div>
      </div>
    </Section>
  )
}

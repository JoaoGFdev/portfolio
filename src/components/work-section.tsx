import { Building2, MapPin } from "lucide-react"

import { workExperiences } from "~/data/work"

import { Section } from "./section"

export function WorkSection() {
  return (
    <Section title="Experience">
      {workExperiences.map((experience, index) => (
        <div
          key={index}
          className="space-y-4 border-b border-zinc-800 py-6 last:border-b-0"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                {experience.role} · {experience.company}
              </h3>
              <p className="text-sm text-zinc-500">
                {experience.startDate} - {experience.endDate}
              </p>
            </div>
            <div className="space-y-1 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>{experience.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{experience.location}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              {experience.description.split("\n").map((paragraph, index) => (
                <p key={index} className="text-zinc-400">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill) => (
                <div
                  key={skill}
                  className="cursor-default rounded-xl bg-zinc-800 px-2 py-1 text-xs hover:bg-zinc-700"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </Section>
  )
}

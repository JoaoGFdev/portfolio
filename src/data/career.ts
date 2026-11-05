// Month precision is enough for the timeline. `end: null` means ongoing.
export type Period = {
  start: string
  end: string | null
}

export type Role = Period & { key: string }

// One employer can hold several roles, newest first. More than one role at the
// same place is shown as a progression rather than separate jobs.
export type Employer = { id: string; roles: readonly Role[] }

export const work: readonly Employer[] = [
  { id: "acelera", roles: [{ key: "acelera", start: "2026-03", end: null }] },
  {
    id: "slabware",
    roles: [{ key: "slabware", start: "2024-03", end: "2026-03" }],
  },
  { id: "beebee", roles: [{ key: "beebee", start: "2023-10", end: "2024-03" }] },
  { id: "gmill", roles: [{ key: "gmill", start: "2022-11", end: "2023-10" }] },
  { id: "atw", roles: [{ key: "atw", start: "2022-03", end: "2022-11" }] },
  {
    id: "uvv",
    roles: [
      { key: "uvv", start: "2021-09", end: "2022-03" },
      { key: "uvv-volunteer", start: "2019-07", end: "2021-09" },
    ],
  },
]

export const education = {
  key: "education",
  start: "2018-01",
  end: "2023-12",
} as const satisfies Role

export const skillGroups = {
  frontend: [
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "shadcn/ui",
    "TanStack Query",
    "TanStack Table",
  ],
  mobile: ["React Native", "Expo", "Zustand"],
  backend: [
    "Node.js",
    "Supabase",
    "PostgreSQL",
    "tRPC",
    "Drizzle",
    "Prisma",
    "Python",
  ],
  ai: ["Vercel AI SDK", "AI Gateway", "OpenRouter", "RAG"],
  infra: ["Vercel", "Cloudflare", "AWS SES", "Docker", "Git"],
} as const

import { clsx } from "clsx"
import type { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { LocationType, EmploymentType } from "@prisma/client"
import { currentUser } from "@clerk/nextjs"
import { env } from "~/env"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const checkUser = async () => {
  const user = await currentUser()

  return user?.id === env.CLERK_USER_ID
}

type EmploymentTypeMap = {
  [key in EmploymentType]: string
}

export const employmentTypeMapEN: EmploymentTypeMap = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  INTERNSHIP: "Intern",
  FREELANCE: "Freelance",
  CONTRACT: "Contract",
  APPRENTICESHIP: "Apprenticeship",
  LEADERSHIP: "Leadership",
  INDIRECT_CONTRACT: "Indirect contract",
  VOLUNTEER: "Volunteer",
} as const

export const employmentTypeMapPT: EmploymentTypeMap = {
  FULL_TIME: "Tempo integral",
  PART_TIME: "Meio período",
  INTERNSHIP: "Estágio",
  FREELANCE: "Freelance",
  CONTRACT: "Contrato",
  APPRENTICESHIP: "Aprendiz",
  LEADERSHIP: "Liderança",
  INDIRECT_CONTRACT: "Contrato indireto",
  VOLUNTEER: "Voluntário",
} as const

type LocationTypeMap = {
  [key in LocationType]: string
}

export const locationTypeMapEn: LocationTypeMap = {
  REMOTE: "Remote",
  ONSITE: "Onsite",
  HYBRID: "Hybrid",
} as const

export const locationTypeMapPT: LocationTypeMap = {
  REMOTE: "Remoto",
  ONSITE: "Presencial",
  HYBRID: "Híbrido",
} as const

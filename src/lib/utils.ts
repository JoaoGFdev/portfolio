import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { type EmploymentType } from "@prisma/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
} as const

export const employmentTypeMapPT: EmploymentTypeMap = {
  FULL_TIME: "Tempo integral",
  PART_TIME: "Meio período",
  INTERNSHIP: "Estágio",
  FREELANCE: "Freelance",
  CONTRACT: "Contrato",
} as const

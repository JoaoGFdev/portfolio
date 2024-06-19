"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { type PropsWithChildren, useCallback, useState } from "react"

import { SkillInput } from "~/components/skill-input"
import { Label } from "~/components/ui/label"

export function FilterExperiences({
  children,
  filter,
}: PropsWithChildren & {
  filter: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [value, onChange] = useState<string[]>(
    searchParams.get("skills")?.split(",") ?? [],
  )

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))

      if (value === "") params.delete(name)
      else params.set(name, value)

      const search = params.toString()

      const query = search ? `?${search}` : ""

      // @ts-expect-error - it's a valid URL
      router.push(`${pathname}${query}`, {
        scroll: false,
      })
    },
    [pathname, router, searchParams],
  )

  function handleOnChange(value: string[]) {
    onChange(value)
    createQueryString("skills", value.join(","))
  }

  return (
    <div className="flex flex-col space-y-2">
      {children}
      <div className="flex items-center space-x-2">
        <Label>{filter}</Label>
        <SkillInput
          value={value}
          onValueChange={handleOnChange}
          previewSkillsAmount={10}
          allowSkillCreation={false}
          allowRemoveAll
          searchUsedSkills
        />
      </div>
    </div>
  )
}

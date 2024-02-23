import { CheckIcon, PlusIcon } from "@radix-ui/react-icons"
import { Loader2, Tag } from "lucide-react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

import useDebounceValue from "~/hooks/useDebounceValue"

import { CreateNewSkillDialog } from "./create-new-skill-dialog"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import { Dialog } from "./ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { api } from "~/trpc/react"

export interface SkillInputProps {
  value: string[]
  onValueChange: (skills: string[]) => void
  error?: string
  previewSkillsAmount?: number
  allowSkillCreation?: boolean
  onApplyToAll?: () => void
}

export function SkillInput({
  value,
  onValueChange,
  error,
  previewSkillsAmount = 5,
  allowSkillCreation = true,
  onApplyToAll,
}: SkillInputProps) {
  const [createSkillDialogOpen, setCreateSkillDialogOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const searchTerm = useDebounceValue(search, 300)

  const {
    data,
    isLoading: isLoadingSkillOptions,
    isInitialLoading: isPendingSkillOptions,
  } = api.skill.getSkills.useQuery({
    search: searchTerm,
  })

  function handleAddSkill(skill: string) {
    onValueChange([...value, skill])
  }

  function handleRemoveSkill(skill: string) {
    onValueChange(value.filter((item) => item !== skill))
  }

  return (
    <Dialog
      open={createSkillDialogOpen}
      onOpenChange={setCreateSkillDialogOpen}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            data-error={!!error}
            variant="outline"
            size="sm"
            className="flex h-8 items-center justify-start overflow-hidden border-dashed px-2 data-[error=true]:border-red-400 data-[error=true]:bg-red-50"
          >
            <div className="mr-2 h-3 w-3">
              <Tag size={12} />
            </div>
            <span className="text-xs">Skills</span>

            {!!error && (
              <span className="ml-2 text-xs font-normal">{error}</span>
            )}

            {value.length > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <div className="flex gap-1">
                  {value.length > previewSkillsAmount ? (
                    <Badge
                      variant="default"
                      className="pointer-events-none text-nowrap rounded-sm px-1 font-normal"
                    >
                      {value.length} selected
                    </Badge>
                  ) : (
                    value.map((skill) => (
                      <Badge
                        variant="secondary"
                        key={skill}
                        className="pointer-events-none rounded-sm px-1 font-normal"
                      >
                        {skill}
                      </Badge>
                    ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Skills"
              onValueChange={setSearch}
              value={search}
            />

            <CommandList>
              <ScrollArea className="h-[240px] w-full">
                <CommandGroup>
                  {allowSkillCreation && (
                    <CommandItem
                      onSelect={() => {
                        setCreateSkillDialogOpen(true)
                      }}
                      className="flex items-center gap-2"
                    >
                      <PlusIcon className="h-3 w-3" />
                      Create new
                    </CommandItem>
                  )}

                  {isLoadingSkillOptions || isPendingSkillOptions ? (
                    <div className="text-muted-foreground flex cursor-default select-none items-center justify-center gap-2 rounded-sm p-2 text-sm">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>Loading tags...</span>
                    </div>
                  ) : data && data.length === 0 ? (
                    <div className="text-muted-foreground flex cursor-default select-none items-center justify-center gap-2 rounded-sm p-2 text-sm">
                      No tags found.
                    </div>
                  ) : (
                    data?.map((option) => {
                      const isSelected = value.includes(option.name)

                      return (
                        <CommandItem
                          key={option.id}
                          value={option.name}
                          onSelect={() => {
                            if (isSelected) {
                              handleRemoveSkill(option.name)
                            } else {
                              handleAddSkill(option.name)
                            }
                          }}
                        >
                          <div
                            className={twMerge(
                              "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible",
                            )}
                          >
                            <CheckIcon className={twMerge("h-4 w-4")} />
                          </div>
                          <span>{option.name}</span>
                        </CommandItem>
                      )
                    })
                  )}
                </CommandGroup>
              </ScrollArea>
            </CommandList>

            {onApplyToAll && (
              <div className="border-t">
                <CommandItem
                  disabled={value.length === 0}
                  onSelect={onApplyToAll}
                  className="m-1 justify-center text-center text-sm font-normal"
                >
                  Apply to all
                </CommandItem>
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>

      {allowSkillCreation && (
        <CreateNewSkillDialog
          onRequestClose={() => {
            setCreateSkillDialogOpen(false)
          }}
        />
      )}
    </Dialog>
  )
}

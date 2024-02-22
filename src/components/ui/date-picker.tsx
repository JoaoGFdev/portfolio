"use client"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { cn } from "~/lib/utils"
import { format, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Input } from "~/components/ui/input"
import { ptBR } from "date-fns/locale"

interface Props {
  initialDate?: Date
  onChange?: (date: Date) => void
}

const options = {
  locale: ptBR,
}

export function DatePicker({ initialDate, onChange }: Props) {
  const [date, setDate] = useState<Date | undefined>(initialDate)
  const [stringDate, setStringDate] = useState(
    initialDate ? format(initialDate, "PPP", options) : "",
  )

  return (
    <Popover key={date?.getDate()}>
      <div className="relative w-full md:w-72">
        <Input
          type="string"
          placeholder="__/__/____"
          value={stringDate}
          onFocus={() => {
            if (date) setStringDate(format(date, "P", options))
          }}
          onChange={(e) => {
            if (date) setStringDate("")
            setStringDate(e.target.value)
          }}
          onBlur={(e) => {
            // const parsedDate = new Date(e.target.value)
            const parsedDate = parse(e.target.value, "P", new Date(), options)

            if (parsedDate.toString() !== "Invalid Date") {
              setDate(parsedDate)
              setStringDate(format(parsedDate, "PPP", options))
              onChange?.(parsedDate)
            }
          }}
        />
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "absolute right-0 top-[50%] translate-y-[-50%] font-normal first-line:rounded-l-none",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent align="end" className="w-auto p-0">
        <Calendar
          locale={ptBR}
          lang="pt-BR"
          mode="single"
          captionLayout="dropdown-buttons"
          selected={date}
          defaultMonth={date}
          onSelect={(selectedDate) => {
            if (!selectedDate) return
            setDate(selectedDate)
            setStringDate(format(selectedDate, "PPP", options))
            onChange?.(selectedDate)
          }}
          fromYear={1960}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  )
}

import { auth } from "@clerk/nextjs"
import { useLocale } from "next-intl"
import Link from "next/link"
import { Button, buttonVariants } from "~/components/ui/button"
import { canWrite } from "~/lib/roles"
import { cn } from "~/lib/utils"

export function FormButtons({ editable }: { editable?: boolean }) {
  const locale = useLocale()

  return (
    <div className="flex w-full justify-end gap-4">
      <Link
        href={`/${locale}/settings/experience`}
        className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-44")}
      >
        Cancel
      </Link>
      <Button
        className="w-full sm:w-44"
        type="submit"
        disabled={!canWrite(auth())}
      >
        {editable ? "Update" : "Create"}
      </Button>
    </div>
  )
}

"use client"

import type { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { buttonVariants } from "~/components/ui/button"
import { cn } from "~/lib/utils"

interface SidebarNavProps<T extends string>
  extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: Route<T>
    title: string
  }[]
}

export function SidebarNav<T extends string>({
  className,
  items,
  ...props
}: SidebarNavProps<T>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item, i) => {
        const href = item.href.toString().replace(/\/(en|pt)/, "")

        return (
          <Link
            key={i}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname.includes(href) && "bg-slate-100 dark:bg-slate-800",
              "justify-start",
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}

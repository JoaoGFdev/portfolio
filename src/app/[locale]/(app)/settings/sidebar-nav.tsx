"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Route } from "next"

import { cn } from "~/lib/utils"
import { buttonVariants } from "~/components/ui/button"

interface SidebarNavProps<T extends string>
  extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: Route<T> | URL
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
      {items.map((item, i) => (
        <Link
          key={i}
          // @ts-expect-error - `href` is a string
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname.includes(item.href.toString()) &&
              "bg-slate-100 dark:bg-slate-800",
            "justify-start",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

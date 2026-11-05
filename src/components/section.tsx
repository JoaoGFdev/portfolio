import { type PropsWithChildren } from "react"

// Section titles sit in a sticky rail beside the content on wide screens.
export function Section({
  id,
  title,
  children,
}: PropsWithChildren<{ id: string; title: string }>) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="grid gap-x-12 gap-y-6 border-t border-rule pt-8 md:grid-cols-[11rem_1fr] md:pt-10"
    >
      <h2
        id={`${id}-title`}
        className="font-display text-3xl font-bold tracking-[-0.015em] [font-stretch:85%] md:sticky md:top-8 md:self-start"
      >
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

// Splits a "- item\n- item" message into list items, or one paragraph.
export function Description({ text }: { text: string }) {
  const lines = text.split("\n").filter(Boolean)
  const isList = lines.every((line) => line.startsWith("- "))

  if (!isList) return <p className="max-w-[65ch]">{text}</p>

  return (
    <ul className="max-w-[65ch] space-y-2">
      {lines.map((line) => (
        <li
          key={line}
          className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5 before:bg-muted"
        >
          {line.slice(2)}
        </li>
      ))}
    </ul>
  )
}

export function Stack({ items }: { items: string }) {
  return <p className="mt-4 max-w-[65ch] text-sm text-muted">{items}</p>
}

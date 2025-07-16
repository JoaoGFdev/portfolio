import { getTranslations } from "next-intl/server"

import { getLocale, toggleLocaleAction } from "~/utils/locale"

export async function ToggleLocale() {
  const t = await getTranslations("Header")
  const locale = await getLocale()

  return (
    <form action={toggleLocaleAction}>
      <button
        type="submit"
        className="flex gap-2 rounded-xl p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <p className="size-6 text-zinc-600 dark:text-zinc-200">
          {locale.toUpperCase()}
        </p>
        <span className="sr-only">{t("toggleTheme")}</span>
      </button>
    </form>
  )
}

import { getLocale, getTranslations } from "next-intl/server"

import { Link } from "~/i18n/navigation"

export async function ToggleLocale() {
  const t = await getTranslations("Header")
  const other = (await getLocale()) === "pt" ? "en" : "pt"

  // A prefetched link to the other static page; next-intl also stores the
  // choice in the NEXT_LOCALE cookie so "/" remembers it.
  return (
    <Link
      href="/"
      locale={other}
      hrefLang={other}
      lang={other}
      aria-label={t("toggleLocale")}
      className="grid h-10 place-items-center rounded-md px-3 text-sm font-medium text-muted transition-colors hover:bg-rule/60 hover:text-ink"
    >
      {t("localeLabel")}
    </Link>
  )
}

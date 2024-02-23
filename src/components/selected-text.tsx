import { useTranslations } from "next-intl"

export function SelectedText() {
  const t = useTranslations("experience")

  return t("selected")
}

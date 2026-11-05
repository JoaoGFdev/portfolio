import { getTranslations } from "next-intl/server"

export async function Footer() {
  const t = await getTranslations("Footer")

  return (
    <footer className="mt-24 border-t border-rule pt-10 pb-4">
      <p className="font-display text-3xl font-bold tracking-[-0.015em] [font-stretch:85%] md:text-4xl">
        {t("cta")}
      </p>
      <a
        href="mailto:me@joaogf.dev"
        className="mt-3 inline-block text-lg font-medium text-blue underline decoration-blue/30 underline-offset-4 hover:decoration-blue"
      >
        {t("email")}
      </a>
    </footer>
  )
}

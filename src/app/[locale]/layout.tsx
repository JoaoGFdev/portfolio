import "~/styles/globals.css"

import { GeistSans } from "geist/font/sans"
import { type Metadata } from "next"
import { Bricolage_Grotesque } from "next/font/google"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Provider } from "~/components/provider"
import { routing } from "~/i18n/routing"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  variable: "--font-bricolage",
  display: "swap",
})

const baseMetadata: Metadata = {
  metadataBase: new URL("https://www.joaogf.dev"),
  title: {
    default: "João Guilherme Fonseca",
    template: "%s | JoaoGF",
  },
  creator: "João Guilherme Fonseca",
  classification: "Developer",
  category: "Web Development",
  keywords: [
    "João Guilherme",
    "Frontend",
    "Full-stack",
    "AI",
    "Supabase",
    "Mobile",
    "Developer",
    "React",
    "Next.js",
    "React Native",
    "Expo",
    "TypeScript",
    "TailwindCSS",
    "shadcn",
    "Node.js",
    "Fullstack",
    "Brazil",
    "Portuguese",
    "English",
    "Web Development",
    "Mobile Development",
    "Brasil",
    "Português",
    "Desenvolvedor",
    "Desenvolvimento Web",
    "Desenvolvimento Mobile",
    "Desenvolvimento de Software",
  ],
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  twitter: {
    title: "JoaoGF",
    card: "summary_large_image",
    creator: "@joaogf.dev",
  },
}

type Props = Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return baseMetadata
  const t = await getTranslations({ locale, namespace: "Metadata" })

  return {
    ...baseMetadata,
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        pt: "/pt",
        "x-default": "/",
      },
    },
    openGraph: {
      title: "João Guilherme Fonseca",
      description: t("description"),
      url: `/${locale}`,
      siteName: "JoaoGF",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? "en_US" : "pt_BR",
      type: "website",
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <html
      lang={locale === "pt" ? "pt-BR" : "en"}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${GeistSans.variable} ${bricolage.variable} min-h-screen font-sans antialiased`}
      >
        <Provider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </Provider>
      </body>
    </html>
  )
}

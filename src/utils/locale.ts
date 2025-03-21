import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

export async function getLocale() {
  const requestHeaders = await headers()
  const cookieStore = await cookies()

  const acceptLanguage: string = requestHeaders.get("accept-language") ?? ""
  const currentCookie = cookieStore.get("NEXT_LOCALE")?.value

  const currentLocale = currentCookie
    ? currentCookie
    : acceptLanguage.toLowerCase().includes("pt")
      ? "pt"
      : "en"

  return currentLocale
}

export async function toggleLocaleAction() {
  "use server"
  const cookieStore = await cookies()
  const currentLocale = await getLocale()

  const newLocale = currentLocale === "pt" ? "en" : "pt"

  // Set the new locale in cookies
  cookieStore.set("NEXT_LOCALE", newLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  })

  redirect("/")
}

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

import { locales } from "./i18n"

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
})

const isApiRoute = createRouteMatcher([
  "/api/(.*)",
  "/robots.txt",
  "/sitemap.xml",
])

export default clerkMiddleware((auth, req) => {
  if (isApiRoute(req)) return NextResponse.next()

  return intlMiddleware(req)
})

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/robots.txt",
    "/sitemap.xml",
  ],
}

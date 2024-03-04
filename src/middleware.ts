import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import createMiddleware from "next-intl/middleware"
import { locales } from "./i18n"
import { NextResponse } from "next/server"

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: "en",
})

const isApiRoute = createRouteMatcher(["/api/(.*)"])

export default clerkMiddleware((auth, req) => {
  if (isApiRoute(req)) return NextResponse.next()

  return intlMiddleware(req)
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

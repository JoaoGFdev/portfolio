import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

const intlMiddleware = createMiddleware({
  locales: ["en", "pt"],

  defaultLocale: "en",
})

export default authMiddleware({
  beforeAuth: (req) => {
    return intlMiddleware(req)
  },
  afterAuth() {
    return NextResponse.next()
  },
  publicRoutes: ["/", "/pt", "/:locale/sign-in"],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(en|pt)/(api|trpc)(.*)"],
}

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
  afterAuth(_, req) {
    if (req.url.endsWith("/settings")) {
      const url = req.nextUrl.clone()
      url.pathname = url.pathname.replace("/settings", "/settings/experience")
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(en|pt)/(api|trpc)(.*)"],
}

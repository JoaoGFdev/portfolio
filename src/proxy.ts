import createMiddleware from "next-intl/middleware"

import { routing } from "./i18n/routing"

// Sends "/" to /en or /pt using the NEXT_LOCALE cookie, then Accept-Language.
export default createMiddleware(routing)

export const config = {
  // Skip API routes, Next internals, Vercel internals and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
}

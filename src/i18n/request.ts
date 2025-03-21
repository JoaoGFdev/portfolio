import { getRequestConfig } from "next-intl/server"

import { getLocale } from "~/utils/locale"

export default getRequestConfig(async () => {
  // Check the Accept-Language header for the browser language
  const locale = await getLocale()

  return {
    locale,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})

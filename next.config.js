import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    typedRoutes: true,
  },
}

export default withNextIntl(config)

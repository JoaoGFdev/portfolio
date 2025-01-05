import "~/styles/globals.css"

import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { type Metadata } from "next"

import { Provider } from "~/components/provider"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.joaogf.dev"),
  title: {
    default: "JoaoGF",
    template: "%s | JoaoGF",
  },
  description: "Frontend and Mobile (expo) Developer",
  openGraph: {
    title: "JoaoGF",
    description: "Frontend and Mobile (expo) Developer",
    url: "https://www.joaogf.dev",
    siteName: "JoaoGF",
    locale: "en_US",
    type: "website",
  },
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} bg:white min-h-screen font-mono text-black antialiased selection:bg-zinc-200 dark:bg-black dark:text-white dark:selection:bg-zinc-700`}
      >
        <div className="mx-auto max-w-5xl px-4 py-8">
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  )
}

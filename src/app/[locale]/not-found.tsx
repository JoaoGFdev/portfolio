import Link from "next/link"
import { Button } from "~/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex min-h-[100svh] flex-col items-center justify-center gap-4 px-4 text-center md:gap-8 md:px-6">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl">
          404 - Lost in the clouds
        </h1>
        <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          You seem to have stumbled into the clouds.
          <br />
          Let&apos;s get you back down to earth.
        </p>
      </div>
      <div className="w-full max-w-xs space-y-2">
        <Link href="/" prefetch>
          <Button className="w-full">Go to home</Button>
        </Link>
      </div>
    </div>
  )
}

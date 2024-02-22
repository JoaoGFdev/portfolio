import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Experiences } from "./experiences"

export default async function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <div className="flex flex-col justify-center gap-2 py-12 sm:flex-row sm:gap-6 md:py-20">
        <div className="flex gap-6">
          <Avatar className="static h-28 w-28 rounded-3xl md:h-48 md:w-48">
            <AvatarImage src="https://github.com/joaogf03.png" alt="@joaogf" />
            <AvatarFallback className="font-anta rounded-3xl text-xl md:text-9xl">
              JG
            </AvatarFallback>
          </Avatar>
          <h1 className="font-anta text-3xl font-bold sm:hidden md:text-6xl">
            João Guilherme
            <br className="sm:hidden" />
            Fonseca
          </h1>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="font-anta hidden text-4xl font-bold sm:block md:text-6xl">
            João Guilherme Fonseca
          </h1>
          <p className="max-w-lg text-lg font-light leading-tight md:text-2xl">
            My passion lies in building web applications, so let&apos;s build
            something together.
          </p>
        </div>
      </div>

      <Experiences />
    </div>
  )
}

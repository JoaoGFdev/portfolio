import { Experiences } from "./experiences"

export default async function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Info />
      <Experiences />
    </div>
  )
}

function Info() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 py-12 md:space-y-4 md:py-24">
      <h1 className="text-center text-3xl font-bold md:text-6xl">
        Hello, I&apos;m João Guilherme Fonseca
      </h1>
      <p className="w-2/3 text-center text-lg font-light md:text-2xl">
        I&apos;m a software developer based in Brazil and I&apos;m passionate
        about building web applications.
      </p>
    </div>
  )
}

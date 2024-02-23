import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <html>
      <body>
        <div className="flex justify-center py-24">
          <SignIn />
        </div>
      </body>
    </html>
  )
}

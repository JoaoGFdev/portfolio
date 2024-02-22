import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { checkUser } from "~/lib/utils"

export async function Clerk() {
  const isMe = await checkUser()

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal" afterSignInUrl="/">
          <Button variant="ghost">Entrar</Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        {isMe && (
          <Link href="/dashboard">
            <Button variant="link">Dashboard</Button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  )
}

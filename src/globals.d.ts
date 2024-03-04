export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "me" | "write"
    }
  }
}

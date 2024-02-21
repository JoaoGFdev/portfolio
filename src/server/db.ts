import { PrismaClient } from "@prisma/client"
import { Pool, neonConfig } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import ws from "ws"

import { env } from "~/env"

neonConfig.webSocketConstructor = ws

const connectionString = env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// globalForPrisma.prisma ??
export const db = new PrismaClient({
  adapter,
  log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
})

// if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
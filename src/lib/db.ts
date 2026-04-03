import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

function getPrismaClient(): PrismaClient {
  // During Next/Vercel builds, env vars like `DATABASE_URL` may not be available
  // early enough. Avoid constructing Prisma at import-time.
  if (process.env.NODE_ENV !== 'production') {
    if (globalThis.prisma) return globalThis.prisma
    if (!process.env.DATABASE_URL) {
      throw new Error('Missing DATABASE_URL for PrismaClient.')
    }
    globalThis.prisma = new PrismaClient()
    return globalThis.prisma
  }

  if (!process.env.DATABASE_URL) {
    throw new Error('Missing DATABASE_URL for PrismaClient.')
  }
  return new PrismaClient()
}

// Export a lazy Prisma client so `import { db } from "@/lib/db"` never throws.
export const db = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getPrismaClient()
      const value = (client as any)[prop]
      if (typeof value === 'function') return value.bind(client)
      return value
    },
  }
) as unknown as PrismaClient

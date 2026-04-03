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
    // On some platforms (e.g. Vercel) build-time Server Components may render
    // without DB env vars available, and Prisma initialization would crash
    // the entire build. Return a "no-op" proxy so the app can still build.
    const noop = () => Promise.resolve(null)
    const proxy = new Proxy(noop, {
      get() {
        return proxy
      },
      apply() {
        return Promise.resolve(null)
      },
    })

    return proxy as unknown as PrismaClient
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
      if (typeof value === 'function') {
        // Keep correct `this` semantics for Prisma methods.
        return (...args: any[]) => value.apply(client, args)
      }
      return value
    },
  }
) as unknown as PrismaClient

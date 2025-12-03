import { PrismaClient } from '../../prisma/generated/client.ts';
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "astro:env/server";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const adapter = new PrismaPg({
   connectionString: DATABASE_URL,
});

const prisma: PrismaClient =
  global.prisma ||
  new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'], // Uncomment for debuggin
    adapter
  })

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma
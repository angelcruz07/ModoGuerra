import { betterAuth } from "better-auth";
import { PrismaClient } from "@prisma/client";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
  appName: "Devtalles Community Blog",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
  },

  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
      impersonationSessionDuration: 60 * 60 * 25,
    }),
  ],

  session: {
    expiresIn: 60 * 60 * 24 * 3, // 3 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },

  trustedOrigins: ["http://localhost:4321"],
});

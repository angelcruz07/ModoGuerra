import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import prisma from "../prisma";
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from "astro:env/server";

export const auth = betterAuth({
  appName: "Devtalles Community Blog",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  socialProviders: {
    discord: {
      clientId: DISCORD_CLIENT_ID as string,
      clientSecret: DISCORD_CLIENT_SECRET as string,
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

  trustedOrigins: ["http://localhost:4321", "https://www.modoguerra.com"],
});

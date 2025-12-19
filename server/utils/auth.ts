import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins/admin";
import prisma from "./prisma";

/** Configuracion de BetterAuth
 * Se configura betther auth estableciendo que se sera con email & password
 * Ademas que se usara como proveedor SQL lite
 *
 * Ademas de ello se emplea el prisma client creado y configurado en utils/prisma
 */
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        required: false,
      },
      banned: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
    },
  },
  plugins: [admin()],
});

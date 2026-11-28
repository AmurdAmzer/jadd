// Better Auth configuration (server only). See docs/design/auth.md.
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { db } from "@/lib/db";
import { isValidUsername } from "@/lib/students";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // creating an account must not log anyone in
  },
  user: {
    additionalFields: {
      mustChangePassword: { type: "boolean", required: false, defaultValue: true, input: false },
    },
  },
  plugins: [
    username({ usernameValidator: isValidUsername }), // keeps blue-heron's hyphen
    nextCookies(), // lets server code set cookies; keep it last
  ],
});
// One shared Prisma client for the whole app.
// In development, reuse it across hot reloads so we don't open extra connections.

import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";


const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };


function createClient() {
    const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
    const client = new PrismaClient({ adapter });

    return client;
}


export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = db;
}
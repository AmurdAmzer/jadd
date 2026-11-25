import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

const usernames = ["blue-heron", "red-maple"];

async function main() {
  const password = process.env.SEED_PASSWORD;
  if (!password) throw new Error("SEED_PASSWORD is not set in .env");

  for (const username of usernames) {
    const passwordHash = await bcrypt.hash(password, 12);
    await db.student.upsert({
      where: { username },
      update: {},
      create: { username, passwordHash },
    });
    console.log(`Seeded ${username}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
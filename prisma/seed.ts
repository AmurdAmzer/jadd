import "dotenv/config";
import { auth } from "../lib/auth";
import { db } from "../lib/db";

const usernames = ["blue-heron", "red-maple"];

async function main() {
  const password = process.env.SEED_PASSWORD;
  if (!password) throw new Error("SEED_PASSWORD is not set in .env");

  for (const username of usernames) {
    const existing = await db.user.findUnique({ where: { username } });
    if (existing) {
      console.log(`Skipped ${username} (already exists)`);
      continue;
    }
    await auth.api.signUpEmail({
      body: { name: username, email: `${username}@students.jadd.invalid`, password, username },
    });
    console.log(`Created ${username}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
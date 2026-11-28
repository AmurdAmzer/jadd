// Health check: confirms the app can reach the database.

import { db } from "@/lib/db";

export async function GET() {
    const students = await db.user.count();
    return Response.json({ students });
}



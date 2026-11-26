// Returns one student by username, without the password hash.

import { db } from "@/lib/db";

export async function GET(_request: Request, context: { params: Promise<{ username: string }> }) {

    const { username } = await context.params;

    const student = await db.student.findUnique({
        where: { username },
        select: { id: true, username: true, mustChangePassword: true },
    });

    return Response.json(student);
}
// Data access for students. Never selects passwordHash.

import {db} from "@/lib/db";

export async function getStudentByUsername(username: string) {
    
    return await db.student.findUnique({
        where: { username },
        select: { id: true, username: true, mustChangePassword: true },
    });
}

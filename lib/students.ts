// Data access for students. Never selects passwordHash.

import {db} from "@/lib/db";

export async function getStudentByUsername(username: string) {
    
    return await db.student.findUnique({
        where: { username },
        select: { id: true, username: true, mustChangePassword: true },
    });
}

const USERNAME_PATTERN = /^[a-z]+-[a-z]+$/;

// Usernames are two lowercase words joined by a hyphen, e.g. blue-heron.
export function isValidUsername(username: string){
    return username.length <= 40 && USERNAME_PATTERN.test(username);
}
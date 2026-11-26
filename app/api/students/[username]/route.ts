// Returns one student by username, without the password hash. Unknown username: 404.

import { getStudentByUsername } from "@/lib/students";

export async function GET(_request: Request, context: { params: Promise<{ username: string }> }) {

    const { username } = await context.params;

    const student = await getStudentByUsername(username);

    if (!student) return Response.json({ error: "Student not found" }, { status: 404 });
    return Response.json(student);
}
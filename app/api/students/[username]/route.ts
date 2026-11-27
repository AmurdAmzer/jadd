// Returns one student by username, without the password hash. (Bad shape: 400. Unknown: 404).

import { getStudentByUsername, isValidUsername } from "@/lib/students";

export async function GET(_request: Request, context: { params: Promise<{ username: string }> }) {

    const { username } = await context.params;

    if (!isValidUsername(username)) return Response.json({ error: "Invalid username" }, { status: 400 });

    const student = await getStudentByUsername(username);

    if (!student) return Response.json({ error: "Student not found" }, { status: 404 });

    return Response.json(student);
}
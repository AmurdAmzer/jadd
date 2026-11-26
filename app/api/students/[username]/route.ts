// Returns one student by username, without the password hash.

// 1. Import db (same as your health route).
import {db} from "@/lib/db";

// 2. GIVEN, type this line exactly:
export async function GET(_request: Request, context: { params: Promise<{ username: string }> }) {
// 3. Get the username out of context.params (it's a promise, so await it).
//    Hint: const { username } = await context.params;
    const { username } = await context.params;

// 4. Find ONE student, using an allow-list, and await it:
//      db.student.findUnique({
//        where:  { ___ },
//        select: { id: true, ___, ___ },
//      })

const student = await db.student.findUnique({
    where:  { username },
        select: { id: true, username: true, mustChangePassword: true },
         });




// 5. Return the student as JSON.
return Response.json(student);
}
// Health check: confirms the app can reach the database.

import { db } from "@/lib/db";

// 2. Export an async function named GET.

export async function GET() {
// 3. Inside it, count the students and store the number in a const called students.
//    Hint: await, then db.student.count()
    const students = await db.student.count();

    return Response.json({ students })
}



// 4. Return the number as JSON, shaped like { students: 2 }.
//    Hint: Response.json({ students })


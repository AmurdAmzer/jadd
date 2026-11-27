// Shows one student. Bad shape or unknown username: the 404 page.
import { notFound } from "next/navigation";
import { getStudentByUsername, isValidUsername } from "@/lib/students";

export default async function StudentPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  if (!isValidUsername(username)) notFound();

  const student = await getStudentByUsername(username);

  if (!student) notFound();

  return (
    <main className="mx-auto max-w-[720px] px-4 py-16">
      <div className="rounded-lg bg-card p-6">
        <p className="text-sm text-muted">Student</p>
        <h1 className="mt-1 text-2xl font-bold">{student.username}</h1>
        <p className="mt-4 text-muted">
          Must change password:{" "}
          <span className="font-semibold text-ink">
            {student.mustChangePassword ? "Yes" : "No"}
          </span>
        </p>
      </div>
    </main>
  );
}
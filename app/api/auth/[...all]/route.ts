// All Better Auth endpoints live under /api/auth/... (catch-all route).
// Public sign-up is blocked: accounts are teacher-created (ADR-005).
import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

const handler = toNextJsHandler(auth);

export const GET = handler.GET;

export async function POST(request: Request) {
  const { pathname } = new URL(request.url);
  if (pathname.startsWith("/api/auth/sign-up")) {
    return Response.json({ error: "Sign-up is disabled" }, { status: 403 });
  }
  return handler.POST(request);
}
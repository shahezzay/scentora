import { getUser } from "@/lib/auth";
import { fail } from "@/lib/http";

// Returns { user } for admins, or { error: Response } for everyone else.
export async function requireAdmin() {
  const user = await getUser();
  if (!user) return { error: fail("Please log in.", 401) };
  if (user.role !== "admin") return { error: fail("Admins only.", 403) };
  return { user };
}

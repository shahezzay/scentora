import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession, publicUser } from "@/lib/auth";
import { json, fail, readBody, str, rateLimit, handle } from "@/lib/http";

export const POST = handle(async (req) => {
  if (!rateLimit(req, "login", 15, 15 * 60 * 1000)) return fail("Too many attempts. Please try again later.", 429);
  const b = await readBody(req);
  const email = str(b.email, 200).toLowerCase();
  const password = String(b.password || "");
  const pool = await db();
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const u = rows[0];
  const ok = u && (await bcrypt.compare(password, u.password_hash));
  if (!ok) return fail("Incorrect email or password.", 401);
  await createSession(u);
  return json({ user: publicUser(u) });
});

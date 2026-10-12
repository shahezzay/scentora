import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession, publicUser } from "@/lib/auth";
import { json, fail, readBody, str, rateLimit, handle } from "@/lib/http";
import { isValidEmail } from "@/lib/pricing";

export const POST = handle(async (req) => {
  if (!rateLimit(req, "register", 10, 15 * 60 * 1000)) return fail("Too many attempts. Please try again later.", 429);
  const b = await readBody(req);
  const first = str(b.firstName, 60), last = str(b.lastName, 60);
  const email = str(b.email, 200).toLowerCase();
  const password = String(b.password || "");
  if (!first || !last) return fail("Please enter your first and last name.");
  if (!isValidEmail(email)) return fail("Enter a valid email address.");
  if (password.length < 6 || password.length > 100) return fail("Password must be at least 6 characters.");

  const pool = await db();
  const hash = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1,$2,$3,$4)
     ON CONFLICT (email) DO NOTHING RETURNING id, first_name, last_name, email, role`,
    [first, last, email, hash]
  );
  if (!rows[0]) return fail("An account with this email already exists. Please log in.", 409);
  await createSession(rows[0]);
  return json({ user: publicUser(rows[0]) }, 201);
});

import { db } from "@/lib/db";
import { isValidEmail } from "@/lib/pricing";
import { json, fail, readBody, str, rateLimit, handle } from "@/lib/http";

export const POST = handle(async (req) => {
  if (!rateLimit(req, "contact", 5, 60 * 60 * 1000)) return fail("Too many messages. Please try again later.", 429);
  const b = await readBody(req);
  const name = str(b.name, 100), email = str(b.email, 200), phone = str(b.phone, 30), message = str(b.message, 3000);
  const fields = {};
  if (!name) fields.name = "Please enter your name";
  if (!isValidEmail(email)) fields.email = "Enter a valid email";
  if (message.length < 10) fields.message = "Message should be at least 10 characters";
  if (Object.keys(fields).length) return fail("Please fix the highlighted fields.", 400, { fields });
  const pool = await db();
  await pool.query("INSERT INTO messages (name, email, phone, message) VALUES ($1,$2,$3,$4)", [name, email, phone || null, message]);
  return json({ ok: true }, 201);
});

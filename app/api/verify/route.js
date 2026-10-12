import { db } from "@/lib/db";
import { json, fail, readBody, str, rateLimit, handle } from "@/lib/http";

export const POST = handle(async (req) => {
  if (!rateLimit(req, "verify", 30, 15 * 60 * 1000)) return fail("Too many attempts. Please try again later.", 429);
  const b = await readBody(req);
  const code = str(b.code, 30).toUpperCase();
  if (!/^SCN-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)) {
    return json({ ok: false, text: "That code does not match the expected format (SCN-XXXX-XXXX)." });
  }
  const pool = await db();
  const { rows } = await pool.query(
    `UPDATE verification_codes SET scans = scans + 1, first_scanned_at = COALESCE(first_scanned_at, now())
     WHERE code = $1 RETURNING product_name, scans`,
    [code]
  );
  const r = rows[0];
  if (!r) return json({ ok: false, text: "We could not verify this code. Please contact support." });
  if (r.scans > 3) return json({ ok: false, text: "This code has been checked several times already. If you did not do this, please contact support." });
  return json({ ok: true, text: `This code is valid. Your ${r.product_name} is genuine.` });
});

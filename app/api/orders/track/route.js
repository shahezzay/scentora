import { db } from "@/lib/db";
import { normalizePhone } from "@/lib/pricing";
import { json, fail, readBody, str, rateLimit, handle } from "@/lib/http";

export const POST = handle(async (req) => {
  if (!rateLimit(req, "track", 30, 15 * 60 * 1000)) return fail("Too many lookups. Please try again later.", 429);
  const b = await readBody(req);
  const orderNo = str(b.orderNo, 20).toUpperCase().replace(/^#/, "");
  const phone = normalizePhone(b.phone);
  const pool = await db();
  const { rows } = await pool.query(
    "SELECT order_no, status, total, created_at FROM orders WHERE order_no = $1 AND phone = $2",
    [orderNo, phone]
  );
  if (!rows[0]) return fail("We could not find an order with that number and phone number.", 404);
  return json({ orderNo: rows[0].order_no, status: rows[0].status, total: rows[0].total, createdAt: rows[0].created_at });
});

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { ORDER_STATUSES } from "@/lib/pricing";
import { json, fail, readBody, handle } from "@/lib/http";

export const PATCH = handle(async (req, { params }) => {
  const { error } = await requireAdmin();
  if (error) return error;
  const { status } = await readBody(req);
  if (!ORDER_STATUSES.includes(status)) return fail("Invalid status.");
  const pool = await db();
  const { rowCount } = await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [status, Number(params.id)]);
  if (!rowCount) return fail("Order not found.", 404);
  return json({ ok: true });
});

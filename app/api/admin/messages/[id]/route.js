import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { json, readBody, handle } from "@/lib/http";

export const PATCH = handle(async (req, { params }) => {
  const { error } = await requireAdmin();
  if (error) return error;
  const { handled } = await readBody(req);
  const pool = await db();
  await pool.query("UPDATE messages SET handled = $1 WHERE id = $2", [!!handled, Number(params.id)]);
  return json({ ok: true });
});

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { json, handle } from "@/lib/http";

export const dynamic = "force-dynamic";

export const GET = handle(async () => {
  const { error } = await requireAdmin();
  if (error) return error;
  const pool = await db();
  const { rows } = await pool.query("SELECT * FROM messages ORDER BY created_at DESC LIMIT 300");
  return json({ messages: rows });
});

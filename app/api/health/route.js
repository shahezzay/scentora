import { db } from "@/lib/db";
import { json, handle } from "@/lib/http";

export const dynamic = "force-dynamic";

export const GET = handle(async () => {
  const pool = await db();
  await pool.query("SELECT 1");
  return json({ ok: true });
});

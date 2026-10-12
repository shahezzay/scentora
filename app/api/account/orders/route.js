import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { json, fail, handle } from "@/lib/http";

export const dynamic = "force-dynamic";

export const GET = handle(async () => {
  const user = await getUser();
  if (!user) return fail("Please log in.", 401);
  const pool = await db();
  const { rows } = await pool.query(
    `SELECT o.order_no, o.status, o.total, o.created_at,
            COALESCE(json_agg(json_build_object('name', i.name, 'qty', i.qty)) FILTER (WHERE i.id IS NOT NULL), '[]') AS items
     FROM orders o LEFT JOIN order_items i ON i.order_id = o.id
     WHERE o.user_id = $1 OR (o.user_id IS NULL AND o.email = $2)
     GROUP BY o.id ORDER BY o.created_at DESC LIMIT 50`,
    [user.id, user.email]
  );
  return json({ orders: rows.map((r) => ({ orderNo: r.order_no, status: r.status, total: r.total, createdAt: r.created_at, items: r.items })) });
});

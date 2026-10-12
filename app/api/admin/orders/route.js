import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { json, handle } from "@/lib/http";

export const dynamic = "force-dynamic";

export const GET = handle(async () => {
  const { error } = await requireAdmin();
  if (error) return error;
  const pool = await db();
  const { rows } = await pool.query(
    `SELECT o.id, o.order_no, o.email, o.first_name, o.last_name, o.address, o.city, o.phone, o.payment, o.note,
            o.subtotal, o.shipping, o.total, o.status, o.created_at,
            COALESCE(json_agg(json_build_object('name', i.name, 'qty', i.qty, 'price', i.price)) FILTER (WHERE i.id IS NOT NULL), '[]') AS items
     FROM orders o LEFT JOIN order_items i ON i.order_id = o.id
     GROUP BY o.id ORDER BY o.created_at DESC LIMIT 300`
  );
  return json({ orders: rows });
});

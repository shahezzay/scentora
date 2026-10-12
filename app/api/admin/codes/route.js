import crypto from "crypto";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { getProduct } from "@/data/products";
import { json, fail, readBody, handle } from "@/lib/http";

export const dynamic = "force-dynamic";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const part = () => Array.from(crypto.randomBytes(4), (b) => ALPHABET[b % ALPHABET.length]).join("");

export const GET = handle(async () => {
  const { error } = await requireAdmin();
  if (error) return error;
  const pool = await db();
  const { rows } = await pool.query("SELECT * FROM verification_codes ORDER BY created_at DESC LIMIT 200");
  return json({ codes: rows });
});

// Generates authenticity codes (to print on boxes) for a product.
export const POST = handle(async (req) => {
  const { error } = await requireAdmin();
  if (error) return error;
  const b = await readBody(req);
  const product = getProduct(String(b.slug));
  const count = Math.min(Math.max(Math.floor(Number(b.count)) || 0, 1), 500);
  if (!product) return fail("Choose a product.");
  const pool = await db();
  const made = [];
  while (made.length < count) {
    const code = `SCN-${part()}-${part()}`;
    const r = await pool.query(
      "INSERT INTO verification_codes (code, product_slug, product_name) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING RETURNING code",
      [code, product.slug, product.name]
    );
    if (r.rows[0]) made.push(code);
  }
  return json({ codes: made }, 201);
});

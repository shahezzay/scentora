import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { getProduct } from "@/data/products";
import { calcShipping, isValidEmail, isValidPhone, normalizePhone } from "@/lib/pricing";
import { json, fail, readBody, str, rateLimit, handle } from "@/lib/http";

const CITIES = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Hyderabad", "Sialkot"];

export const POST = handle(async (req) => {
  if (!rateLimit(req, "order", 10, 60 * 60 * 1000)) return fail("Too many orders from this connection. Please try again later.", 429);
  const b = await readBody(req);

  const errors = {};
  const email = str(b.email, 200).toLowerCase();
  const firstName = str(b.firstName, 60), lastName = str(b.lastName, 60);
  const address = str(b.address, 300), city = str(b.city, 60), note = str(b.note, 500);
  if (!isValidEmail(email)) errors.email = "Enter a valid email address";
  if (!firstName) errors.firstName = "First name is required";
  if (!lastName) errors.lastName = "Last name is required";
  if (address.length < 6) errors.address = "Enter your full address";
  if (!isValidPhone(b.phone)) errors.phone = "Enter a valid mobile number (e.g. 03001234567)";
  if (!CITIES.includes(city)) errors.city = "Please choose a city from the list";
  if (Object.keys(errors).length) return fail("Please fix the highlighted fields.", 400, { fields: errors });

  // Prices always come from the server-side catalogue, never from the browser.
  const merged = new Map();
  for (const it of Array.isArray(b.items) ? b.items : []) {
    const p = getProduct(String(it?.slug));
    const qty = Math.floor(Number(it?.qty));
    if (!p || !(qty >= 1)) continue;
    merged.set(p.slug, (merged.get(p.slug) || 0) + Math.min(qty, 20));
  }
  const lines = [...merged].map(([slug, qty]) => ({ product: getProduct(slug), qty: Math.min(qty, 20) }));
  if (lines.length === 0) return fail("Your cart is empty.");

  const subtotal = lines.reduce((n, l) => n + l.product.price * l.qty, 0);
  const shipping = calcShipping(lines);
  const total = subtotal + shipping;
  const user = await getUser();
  const pool = await db();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    let orderNo, order;
    for (let i = 0; i < 5 && !order; i++) {
      orderNo = "SC" + Math.floor(100000 + Math.random() * 900000);
      const r = await client.query(
        `INSERT INTO orders (order_no, user_id, email, first_name, last_name, address, city, phone, payment, note, subtotal, shipping, total)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'cod',$9,$10,$11,$12)
         ON CONFLICT (order_no) DO NOTHING RETURNING id, order_no`,
        [orderNo, user?.id || null, email, firstName, lastName, address, city, normalizePhone(b.phone), note || null, subtotal, shipping, total]
      );
      order = r.rows[0];
    }
    if (!order) throw new Error("could not allocate order number");
    for (const l of lines) {
      await client.query(
        "INSERT INTO order_items (order_id, slug, name, price, qty) VALUES ($1,$2,$3,$4,$5)",
        [order.id, l.product.slug, l.product.name, l.product.price, l.qty]
      );
    }
    await client.query("COMMIT");
    return json({ orderNo: order.order_no, subtotal, shipping, total }, 201);
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
});

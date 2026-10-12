// Shared by the checkout page (display) and the orders API (authoritative).
export const FREE_SHIPPING_MIN = 3500;
export const SHIPPING_FEE = 250;

export function calcShipping(lines) {
  // lines: [{ product, qty }]
  if (lines.length === 0) return 0;
  const subtotal = lines.reduce((n, l) => n + l.product.price * l.qty, 0);
  const perfumes = lines.filter((l) => !l.product.kind).reduce((n, l) => n + l.qty, 0);
  return perfumes >= 2 || subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
}

export const ORDER_STATUSES = ["placed", "packed", "out_for_delivery", "delivered", "cancelled"];
export const STATUS_LABELS = {
  placed: "Order placed",
  packed: "Packed",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function normalizePhone(p) {
  const d = String(p || "").replace(/[\s-]/g, "");
  if (/^\+923\d{9}$/.test(d)) return "0" + d.slice(3);
  return d;
}
export const isValidPhone = (p) => /^03\d{9}$/.test(normalizePhone(p));
export const isValidEmail = (e) => /^\S+@\S+\.\S+$/.test(String(e || ""));

import { Pool } from "pg";
import bcrypt from "bcryptjs";

// One pool per server instance (kept on globalThis so dev hot-reload doesn't leak connections).
const g = globalThis;

function getPool() {
  if (!g.__scentoraPool) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set. Add your PostgreSQL connection string to the environment variables.");
    }
    g.__scentoraPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : undefined,
    });
  }
  return g.__scentoraPool;
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_no TEXT NOT NULL UNIQUE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  payment TEXT NOT NULL DEFAULT 'cod',
  note TEXT,
  subtotal INTEGER NOT NULL,
  shipping INTEGER NOT NULL,
  total INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'placed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  qty INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  handled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS verification_codes (
  code TEXT PRIMARY KEY,
  product_slug TEXT NOT NULL,
  product_name TEXT NOT NULL,
  scans INTEGER NOT NULL DEFAULT 0,
  first_scanned_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS orders_user_idx ON orders(user_id);
CREATE INDEX IF NOT EXISTS orders_created_idx ON orders(created_at DESC);
`;

async function init() {
  const pool = getPool();
  await pool.query(SCHEMA);
  // Create / refresh the admin account from environment variables.
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const pass = process.env.ADMIN_PASSWORD || "";
  if (email && pass) {
    const hash = await bcrypt.hash(pass, 10);
    await pool.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, role)
       VALUES ('Store', 'Admin', $1, $2, 'admin')
       ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = 'admin'`,
      [email, hash]
    );
  }
}

export async function db() {
  if (!g.__scentoraReady) {
    g.__scentoraReady = init().catch((e) => {
      g.__scentoraReady = null; // retry on the next request
      throw e;
    });
  }
  await g.__scentoraReady;
  return getPool();
}

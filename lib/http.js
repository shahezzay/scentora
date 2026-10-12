import { NextResponse } from "next/server";

export const json = (data, status = 200) => NextResponse.json(data, { status });
export const fail = (message, status = 400, extra = {}) => NextResponse.json({ error: message, ...extra }, { status });

export async function readBody(req) {
  try {
    const b = await req.json();
    return b && typeof b === "object" ? b : {};
  } catch {
    return {};
  }
}

export const str = (v, max = 500) => String(v ?? "").trim().slice(0, max);

// Small in-memory rate limiter (per server instance; good enough to slow down abuse).
const hits = new Map();
export function rateLimit(req, key, limit, windowMs) {
  const ip = (req.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
  const k = `${key}:${ip}`;
  const now = Date.now();
  const arr = (hits.get(k) || []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) { hits.set(k, arr); return false; }
  arr.push(now);
  hits.set(k, arr);
  if (hits.size > 5000) for (const [kk, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(kk);
  return true;
}

export function handle(fn) {
  return async (req, ctx) => {
    try {
      return await fn(req, ctx);
    } catch (e) {
      console.error("[api]", e);
      return fail("Something went wrong on our side. Please try again.", 500);
    }
  };
}

"use client";
import { useEffect, useState } from "react";

// undefined = still loading, null = logged out, object = logged in
export function useUser() {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    let alive = true;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => alive && setUser(d.user || null))
      .catch(() => alive && setUser(null));
    return () => { alive = false; };
  }, []);
  return [user, setUser];
}

export async function api(url, body, method = "POST") {
  const res = await fetch(url, {
    method,
    headers: { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let data = {};
  try { data = await res.json(); } catch {}
  return { ok: res.ok, status: res.status, data };
}

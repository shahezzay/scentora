import { getUser, publicUser } from "@/lib/auth";
import { json, handle } from "@/lib/http";

export const dynamic = "force-dynamic";

export const GET = handle(async () => {
  const u = await getUser();
  return json({ user: u ? publicUser(u) : null });
});

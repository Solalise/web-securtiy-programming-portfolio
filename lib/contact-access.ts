import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

const accessLifetimeSeconds = 60 * 60 * 24 * 7;

function getSecret(): string {
  const secret = process.env.CONTACT_ACCESS_SECRET ?? process.env.AUTH_SECRET;
  if (!secret) throw new Error("A server-side secret is required for contact access.");
  return secret;
}

function getCookieName(id: string): string {
  return `contact_access_${id}`;
}

function sign(id: string, expiresAt: string): string {
  return createHmac("sha256", getSecret())
    .update(`${id}.${expiresAt}`)
    .digest("hex");
}

export async function grantContactAccess(id: string): Promise<void> {
  const expiresAt = String(Math.floor(Date.now() / 1000) + accessLifetimeSeconds);
  const token = `${expiresAt}.${sign(id, expiresAt)}`;
  const cookieStore = await cookies();

  cookieStore.set(getCookieName(id), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/contact",
    maxAge: accessLifetimeSeconds,
  });
}

export async function hasContactAccess(id: string): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName(id))?.value;
  if (!token) return false;

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature || Number(expiresAt) <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  const expected = Buffer.from(sign(id, expiresAt), "hex");
  const received = Buffer.from(signature, "hex");
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export async function clearContactAccess(id: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(getCookieName(id));
}

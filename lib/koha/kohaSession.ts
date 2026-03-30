"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import crypto from "crypto";

const sessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "koha_session",
  cookieOptions: {
    secure: true,
  },
};

export async function loginKoha(username: string, password: string) {
  const auth = Buffer.from(`${username}:${password}`).toString("base64");
  const res = await fetch(`${process.env.KOHA_BASE}/api/v1/libraries`, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  const session = await getIronSession(await cookies(), sessionOptions);

  // store credentials (encrypted inside iron-session cookie)
  session.kohaUser = username;
  session.kohaPass = password;

  // generate your own token (not from Koha)
  const token = crypto.randomBytes(32).toString("hex");
  session.token = token;

  await session.save();

  return {
    token, // send to client
  };
}

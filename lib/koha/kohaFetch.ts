"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const getAuthSession = async () => {
  const session: any = await getIronSession(await cookies(), {
    password: process.env.SESSION_SECRET!,
    cookieName: "koha_session",
  });
  return session;
};

export const kohaFetch = async (
  path: string,
  options: RequestInit = {},
): Promise<Response> => {
  try {
    const session: any = await getAuthSession();

    if (!session.kohaUser || !session.kohaPass) {
      throw new Error("Unauthorized");
    }

    const auth = Buffer.from(
      `${session.kohaUser}:${session.kohaPass}`,
    ).toString("base64");

    const res = await fetch(`${process.env.KOHA_BASE}${path}`, {
      ...options,
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
        ...(options.headers || {}),
      },
    });

    // if (!res.ok) throw new Error("Koha request failed");

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function testKohaConnection(): Promise<string> {
  try {
    const data = await kohaFetch("/api/v1/libraries");
    return `Koha Connection Successful`;
  } catch (error: any) {
    return "Koha Connection Failed";
  }
}

export async function validateKohaSession(): Promise<boolean> {
  try {
    const res = await kohaFetch("/api/v1/patrons?me=true");
    return true;
  } catch {
    return false;
  }
}

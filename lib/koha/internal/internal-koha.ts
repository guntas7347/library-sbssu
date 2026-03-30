"use server";

import * as cheerio from "cheerio";
import { getAuthSession } from "../kohaFetch";

const BASE = "http://localhost:8081";

// ---------- helpers ----------

function parseCookies(raw: string | null): Record<string, string> {
  const jar: Record<string, string> = {};
  if (!raw) return jar;

  const parts = raw.split(/,(?=\s*\w+=)/);

  for (const part of parts) {
    const [cookie] = part.split(";");
    const [key, value] = cookie.split("=");
    jar[key.trim()] = value;
  }

  return jar;
}

function serializeCookies(jar: Record<string, string>): string {
  return Object.entries(jar)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");
}

function normalizeDate(input: string): string {
  // ISO → Koha format
  if (input.includes("T")) {
    return input.replace("T", " ").slice(0, 16);
  }

  return input;
}

function extractCsrf(html: string): string {
  const $ = cheerio.load(html);
  const token = $('input[name="csrf_token"]').val();
  if (!token || typeof token !== "string") {
    throw new Error("CSRF not found");
  }
  return token;
}

// ---------- login ----------

async function login(username: string, password: string) {
  const res1 = await fetch(`${BASE}/cgi-bin/koha/mainpage.pl`);
  const jar1 = parseCookies(res1.headers.get("set-cookie"));

  const html1 = await res1.text();
  const csrf = html1.match(/name="csrf_token"\s+value="([^"]+)"/)?.[1];
  if (!csrf) throw new Error("Login CSRF not found");

  const res2 = await fetch(`${BASE}/cgi-bin/koha/mainpage.pl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: serializeCookies(jar1),
    },
    body: new URLSearchParams({
      csrf_token: csrf,
      login_op: "cud-login",
      koha_login_context: "intranet",
      login_userid: username,
      login_password: password,
      branch: "",
    }),
  });

  const jar2 = parseCookies(res2.headers.get("set-cookie"));

  // merge properly (overwrite duplicates)
  const finalJar = { ...jar1, ...jar2 };

  return serializeCookies(finalJar);
}

// ---------- returns csrf ----------

async function getReturnsCsrf(cookie: string) {
  const res = await fetch(`${BASE}/cgi-bin/koha/circ/returns.pl`, {
    headers: { Cookie: cookie },
  });

  const html = await res.text();
  return extractCsrf(html);
}

// ---------- checkin ----------

export async function checkinCall(barcode: string, overrideDate?: string) {
  if (!barcode) throw new Error("Missing barcode");

  try {
    const session = await getAuthSession();

    const cookie = await login(session.kohaUser, session.kohaPass);
    const csrf = await getReturnsCsrf(cookie);

    console.log("overrideDate", normalizeDate(overrideDate || ""));

    const res = await fetch(`${BASE}/cgi-bin/koha/circ/returns.pl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookie,
      },
      body: new URLSearchParams({
        barcode,
        op: "cud-checkin",
        csrf_token: csrf,
        overrideDate: normalizeDate(overrideDate || ""),
      }),
    });

    if (!res.ok) {
      throw new Error("Checkin failed");
    }

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

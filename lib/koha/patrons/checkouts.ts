"use server";

import { toPlain } from "@/lib/utils";
import { kohaFetch } from "../kohaFetch";

export async function getUserCheckouts(patronId: string) {
  if (!patronId) throw new Error("patronId required");

  try {
    const res = await kohaFetch(`/api/v1/checkouts?patron_id=${patronId}`);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err);
    }

    return toPlain(await res.json());
  } catch (error) {
    throw error;
  }
}

export async function getUserCheckoutBooks(patronId) {
  const res = await kohaFetch(`/api/v1/checkouts?patron_id=${patronId}`);
  const checkouts = await res.json();

  const results = [];

  for (const co of checkouts) {
    const itemRes = await kohaFetch(`/api/v1/items/${co.item_id}`, {
      headers: { "x-koha-embed": "biblio" },
    });

    if (!itemRes.ok) continue;

    const item = await itemRes.json();

    results.push({
      ...item.biblio,
      due_date: co.due_date,
      checkout_date: co.checkout_date,
    });
  }

  return results;
}

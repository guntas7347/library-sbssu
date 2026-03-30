"use server";

import { getBiblioIdByBarcode } from "./books";
import { kohaFetch } from "./kohaFetch";
import { getPatronExtendedAttributes } from "./patrons/extendedAttributes";
import { getPatronById } from "./patrons/patron";

function toIsoSeconds(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;

  return d.toISOString().slice(0, 19) + "Z";
}

export async function issueBook({ patronId, itemId, dueDate, checkout_date }) {
  if (!patronId || !itemId || !dueDate) {
    throw new Error("patronId, itemId, and dueDate are required");
  }

  const payload = {
    due_date: toIsoSeconds(dueDate),
    item_id: itemId,
    patron_id: patronId,
  };

  const res = await kohaFetch("/api/v1/checkouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  console.log("payload", payload);

  console.log("data", data);

  if (!res.ok) {
    throw new Error(typeof data === "string" ? data : JSON.stringify(data));
  }

  return data;
}

export const getIssuedBooks = async (externalId: string) => {
  const res = await kohaFetch(
    `/api/v1/items?q={"external_id":"${externalId}"}`,
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(typeof data === "string" ? data : JSON.stringify(data));
  }

  console.log(data);

  return data;
};

export const getCheckoutByBarcode = async (barcode: string) => {
  try {
    // 1. get item
    const itemRes = await kohaFetch(
      `/api/v1/items?external_id=${encodeURIComponent(barcode)}`,
      {
        headers: {
          "x-koha-embed": "biblio",
        },
      },
    );

    const items = await itemRes.json();

    if (!itemRes.ok || !items.length) {
      const err = new Error("Barcode not found");
      (err as any).data = items;
      (err as any).status = itemRes.status;
      throw err;
    }

    const item = items[0];

    // 2. get checkout
    const checkoutRes = await kohaFetch(
      `/api/v1/checkouts?q=${encodeURIComponent(
        JSON.stringify({ item_id: item.item_id }),
      )}`,
    );

    const checkouts = await checkoutRes.json();

    if (!checkoutRes.ok) {
      const err = new Error(checkouts?.error || "Checkout API failed");
      (err as any).data = checkouts;
      (err as any).status = checkoutRes.status;
      throw err;
    }

    const checkout = checkouts[0];
    if (!checkout) {
      const err = new Error("Checkout not found");
      (err as any).data = checkouts;
      (err as any).status = checkoutRes.status;
      throw err;
    }

    const patron = await getPatronById(checkout?.patron_id);

    // return pure object
    return {
      biblio: item.biblio || null,
      item,
      checkout,
      patron,
    };
  } catch (error) {
    console.error("getCheckoutByBarcode error:", error);
    throw error;
  }
};

"use server";

import { kohaFetch } from "./kohaFetch";

export async function getBooks() {
  const res = await kohaFetch("/api/v1/biblios");

  const data = await res?.json();

  return {
    data,
    totalCount: data.length,
    totalPages: 1,
    page: 1,
  };
}

export async function getBiblioById(biblioId: string) {
  const res = await kohaFetch(`/api/v1/biblios/${biblioId}`);

  const data = await res?.json();

  return data;
}

export async function getItemsByBiblio(biblioId: string) {
  console.log("biblioId", biblioId);
  const res = await kohaFetch(`/api/v1/biblios/${biblioId}`);

  if (!res.ok) {
    throw new Error(JSON.stringify(await res.json()));
  }

  const data = await res.json();
  console.log(data);
  return data;
}

function getCirculationStatus(item) {
  if (item.withdrawn) return "withdrawn";
  if (item.lost_status) return "lost";
  if (item.damaged_status) return "damaged";
  if (item.effective_not_for_loan_status) return "not_for_loan";
  if (item.checked_out_date) return "checked_out";
  return "available";
}

export async function getBookByBarcode(barcode: string) {
  // use external_id (barcode) to search

  if (!barcode) {
    throw new Error("barcode is required");
  }

  const res = await kohaFetch(
    `/api/v1/items?external_id=${encodeURIComponent(barcode)}`,
    {
      headers: {
        "x-koha-embed": "biblio",
      },
    },
  );

  if (!res.ok) {
    const json = await res.json();
    throw new Error(JSON.stringify(json));
  }

  const items = await res.json();

  if (!items || items.length === 0) return null;

  const item = items[0];
  const status = getCirculationStatus(item);

  return {
    ...item,
    circulation_status: status,
  };
}

export const getBiblioIdByBarcode = async (barcode: string) => {
  const res = await kohaFetch(
    `/api/v1/items?external_id=${encodeURIComponent(barcode)}`,
    {
      headers: {
        "x-koha-embed": "biblio",
      },
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(typeof data === "string" ? data : JSON.stringify(data));
  }

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Item not found");
  }

  const item = data[0];

  // embedded biblio
  if (!item.biblio || !item.biblio.biblio_id) {
    throw new Error("Biblio not embedded");
  }

  return item.biblio.biblio_id;
};

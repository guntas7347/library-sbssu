"use server";

import { kohaFetch } from "../kohaFetch";

export const checkinByBarcode = async (
  barcode: string,
  branch: string, // Required by our OpenAPI spec
  returndate?: string,
) => {
  try {
    const res = await kohaFetch(`/api/v1/contrib/guntas/checkin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        barcode,
        branch,
        ...(returndate && { returndate }), // Optional is fine here
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Attaching the status and Koha's specific error message
      const err = new Error(data.error || "Checkin API failed");
      (err as any).data = data;
      (err as any).status = res.status;
      throw err;
    }

    // Return the pure object so your UI can easily read data.messages
    return data;
  } catch (error) {
    console.error("checkinByBarcode error:", error);
    throw error;
  }
};

"use server";

import { kohaFetch } from "@/lib/koha/kohaFetch";
import { createPatronExtendedAttribute } from "./patrons/extendedAttributes";
import { createPatron } from "./patrons/patron";

export async function submitPatronApplication(formData: any) {
  let patronId: string | null = null;
  let userId: string | null = null;

  try {
    // STEP 1
    const patron = await createPatron(formData);
    patronId = patron.patronId;
    userId = patron.userId;

    if (!patronId || !userId) {
      throw new Error("Failed to create patron");
    }

    // STEP 2
    const attributes = [
      { code: "IMAGE_ID", value: formData.image_id },
      { code: "RESERVATION_CATEGORY", value: formData.category },
      { code: "COURSE", value: formData.course },
      { code: "BRANCH", value: formData.branch },
      { code: "BATCH", value: formData.batch },
      { code: "FATHER_NAME", value: formData.fatherName },
    ].filter((attr) => attr.value != null);

    for (const attr of attributes) {
      await createPatronExtendedAttribute(patronId, attr.code, attr.value);
    }

    return {
      success: true,
      patronId,
      userId,
    };
  } catch (error) {
    console.error("Application Submission Error:", error);

    // ROLLBACK
    if (patronId) {
      console.log("ROLLING BACK", patronId);

      try {
        await kohaFetch(`/api/v1/patrons/${patronId}`, {
          method: "DELETE",
        });
      } catch (rollbackError) {
        console.error("Rollback failed:", rollbackError);
      }
    }

    throw error;
  }
}

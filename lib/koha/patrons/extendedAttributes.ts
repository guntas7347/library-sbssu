"use server";

import { kohaFetch } from "../kohaFetch";

type ExtendedAttribute = {
  id: number;
  type: string;
  value: string;
};

export const createPatronExtendedAttribute = async (
  patronId: string,
  type: string,
  value: string,
): Promise<ExtendedAttribute> => {
  try {
    const res = await kohaFetch(
      `/api/v1/patrons/${patronId}/extended_attributes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, value }),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Koha error: ${res.status} - ${text}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Create Extended Attribute Error:", error);
    throw error;
  }
};

export const updatePatronExtendedAttribute = async (
  patronId: string,
  attribute: string,
  value: string,
) => {
  try {
    const attributeId = await getPatronAttributeId(patronId, attribute);
    if (!attributeId)
      throw new Error(
        `Attribute ${attribute} not found for patron ${patronId}`,
      );

    const res = await kohaFetch(
      `/api/v1/patrons/${patronId}/extended_attributes/${attributeId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value,
        }),
      },
    );
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getPatronExtendedAttributes = async (
  patronId: string,
  attribute?: string,
): Promise<string | Record<string, any> | undefined> => {
  try {
    const res = await kohaFetch(
      `/api/v1/patrons/${patronId}/extended_attributes`,
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Koha error: ${res.status} - ${text}`);
    }

    const data: ExtendedAttribute[] = await res.json();

    const attributes: Record<string, any> = Object.fromEntries(
      (data || []).map((attr: any) => [attr.type, attr.value]),
    );

    if (attribute) {
      return attributes[attribute];
    }

    return attributes;
  } catch (error) {
    console.error("Extended Attributes Fetch Error:", error);
    throw error;
  }
};

export const getPatronAttributeId = async (
  patronId: string,
  attribute: string,
): Promise<number | undefined> => {
  try {
    const data = await getPatronExtendedAttributes(patronId);

    return data?.find((item) => item.type === attribute)?.extended_attribute_id;
  } catch (error) {
    console.error("Attribute ID Fetch Error:", error);
    throw error;
  }
};

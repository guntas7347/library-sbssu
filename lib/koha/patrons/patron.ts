"use server";

import { kohaFetch } from "@/lib/koha/kohaFetch";
import { getUserCheckoutBooks, getUserCheckouts } from "./checkouts";

export async function getPatronById(patronId: string) {
  if (!patronId) throw new Error("patronId required");

  try {
    const res = await kohaFetch(`/api/v1/patrons/${patronId}`, {
      headers: {
        "x-koha-embed": "extended_attributes",
      },
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Operation Failed");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}

export async function quickSearchPatrons(searchTerm: string) {
  try {
    const queryObject = [
      { userid: { like: `%${searchTerm}%` } },
      { surname: { like: `${searchTerm}%` } },
      { firstname: { like: `${searchTerm}%` } },
      { phone: searchTerm },
    ];

    const cleanQuery = JSON.parse(JSON.stringify(queryObject));

    const q = encodeURIComponent(JSON.stringify(cleanQuery));

    const url = `/api/v1/patrons?q=${q}&_per_page=10`;

    const res = await kohaFetch(url, {
      headers: {
        "x-koha-embed": "extended_attributes",
      },
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody.error || "Operation Failed");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function searchPatron({ query = {}, page = 1, perPage = 10 }) {
  const q = encodeURIComponent(JSON.stringify(query));

  const url = `/api/v1/patrons?q=${q}`;

  const res = await kohaFetch(url);

  const data = await res?.json();

  const { patron_id } = data[0];

  const checkouts = await getUserCheckoutBooks(patron_id);

  console.log(checkouts);

  return { ...data[0], image: null, checkouts };
}

export async function getPatronImage(patronId: string) {
  const res = await kohaFetch(`/api/v1/patrons/${patronId}/image`);

  if (!res?.ok) return null;

  return res.blob();
}

// Map MemberType → Koha category_id
const mapCategoryCode = (memberType: string) => {
  const categories: Record<string, string> = {
    Student: "ST",
    Faculty: "FAC",
    Staff: "STAFF",
    Alumni: "ALUM",
  };
  return categories[memberType] || "ST";
};

function getExpiryFromGraduation(year: string) {
  if (!year) throw new Error("Missing expectedGraduationYear");
  return `${year}-09-30`;
}

const genderMap: Record<string, string> = {
  Male: "M",
  Female: "F",
  Other: "O",
};

function generateUserId(data: any) {
  if (data.rollNumber) return `USR_${data.rollNumber}`;
  return `USR_${crypto.randomUUID().slice(0, 8)}`.toUpperCase();
}

export const createPatron = async (formData: any) => {
  const userId = generateUserId(formData);

  const res = await kohaFetch("/api/v1/patrons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname: formData.firstname,
      surname: formData.surname,

      userid: userId,
      cardnumber: userId,

      category_id: mapCategoryCode(formData.memberType),
      library_id: "CPL",

      date_of_birth: formData.date_of_birth,
      expiry_date: getExpiryFromGraduation(formData.expectedGraduationYear),

      email: formData.email,
      phone: formData.phone,

      address: formData.address,
      city: formData.city,
      state: formData.state,
      postal_code: formData.postal_code,

      gender: genderMap[formData.gender] || null,
    }),
  });

  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error);
  }

  const data = await res.json();

  return {
    patronId: data?.patron_id,
    userId,
  };
};

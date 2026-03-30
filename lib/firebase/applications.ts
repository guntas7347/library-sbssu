import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export async function createApplication(data: any) {
  if (!data.fullName || !data.email) {
    throw new Error("Missing required fields");
  }

  function splitName(fullName: string) {
    const parts = fullName.trim().split(/\s+/);
    return {
      firstname: parts.slice(0, -1).join(" ") || parts[0],
      surname: parts.slice(-1).join(""),
    };
  }

  const { firstname, surname } = splitName(data.fullName);

  try {
    const docRef = await addDoc(collection(db, "applications"), {
      rollNumber: data.rollNumber || null,
      status: "pending",

      firstname,
      surname,

      // academic
      memberType: data.memberType || "Student",
      category: data.category || "General", // NEW FIELD

      course: data.course || null,
      branch: data.branch || null,
      batch: data.batch || null,
      expectedGraduationYear: data.expectedGraduationYear || null,

      // personal
      fatherName: data.fatherName || null,
      date_of_birth: data.dob || null,
      gender: data.gender || null,

      // contact
      email: data.email,
      phone: data.phoneNumber || null,

      // address
      address: data.streetAddress || null,
      city: data.city || null,
      state: data.state || null,
      postal_code: data.pinCode || null,

      image_id: data.photo || null,

      createdAt: serverTimestamp(),
      approvedAt: null,
    });
    return docRef.id;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function toISO(ts: any) {
  return new Date(
    ts.seconds * 1000 + Math.floor(ts.nanoseconds / 1e6),
  ).toISOString();
}

export async function getApplication(id: string) {
  const docRef = doc(db, "applications", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      firebaseId: docSnap.id,
      ...docSnap.data(),
      createdAt: toISO(docSnap.data().createdAt),
    };
  } else {
    throw new Error("Application not found");
  }
}

export async function getApplications(filter: {
  filter: string;
  value: string;
  page: number;
}) {
  const PAGE_SIZE = 10;

  console.log(filter);

  let constraints: any[] = [];

  // STATUS FILTERS
  if (["pending", "approved", "rejected"].includes(filter.filter)) {
    constraints.push(where("status", "==", filter.filter));
  }

  // NAME PREFIX SEARCH (case-sensitive unless normalized)
  if (filter.filter === "fullName" && filter.value) {
    const value = filter.value.toLowerCase();

    constraints.push(orderBy("firstname_lower"));
    constraints.push(where("firstname_lower", ">=", value));
    constraints.push(where("firstname_lower", "<=", value + "\uf8ff"));
  }

  // PAGINATION
  constraints.push(limit(PAGE_SIZE));

  const q = query(collection(db, "applications"), ...constraints);

  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    data,
    totalCount: data.length,
    totalPages: Math.ceil(data.length / PAGE_SIZE),
    page: filter.page || 1,
  };
}

export const updateApplicationStatus = async (
  id: string,
  status: "approved" | "rejected",
) => {
  const docRef = doc(db, "applications", id);
  await updateDoc(docRef, {
    status,
    approvedAt: status === "approved" ? serverTimestamp() : null,
    rejectedAt: status === "rejected" ? serverTimestamp() : null,
  });
};

export async function deleteApplicationById(id: string) {
  const docRef = doc(db, "applications", id);
  await deleteDoc(docRef);
}

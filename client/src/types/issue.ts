// types/issue.ts

export type LibraryCard = {
  id: string;
  cardNumber: string;
  status: string; // e.g., "available", "issued", etc.
  type: string;
  expiry: string; // ISO Date string
};

export type MemberData = {
  id: string;
  fullName: string;
  photo: string;
  program: string;
  specialization: string;
  email: string;
  membershipId: string;
  memberType: string;
  libraryCards: LibraryCard[];
};

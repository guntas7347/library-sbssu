import prisma from "../../services/prisma.js";

// ---------- PROGRAMS ----------
const samplePrograms = [
  {
    name: "btech",
    duration: 4,
    specialization: [
      { name: "cse" },
      { name: "me" },
      { name: "ce" },
      { name: "ece" },
      { name: "ee" },
      { name: "other" },
    ],
  },
  {
    name: "mtech",
    duration: 2,
    specialization: [
      { name: "cse" },
      { name: "vlsi" },
      { name: "structures" },
      { name: "other" },
    ],
  },
  {
    name: "bca",
    duration: 3,
    specialization: [{ name: "cs" }, { name: "ds" }, { name: "other" }],
  },
  {
    name: "mca",
    duration: 2,
    specialization: [{ name: "cs" }, { name: "it" }, { name: "other" }],
  },
  {
    name: "pgdca",
    duration: 1,
    specialization: [{ name: "cs" }, { name: "it" }, { name: "other" }],
  },
  {
    name: "bsc",
    duration: 3,
    specialization: [
      { name: "math" },
      { name: "phy" },
      { name: "chem" },
      { name: "bio" },
      { name: "other" },
    ],
  },
  {
    name: "msc",
    duration: 2,
    specialization: [
      { name: "math" },
      { name: "phy" },
      { name: "chem" },
      { name: "cs" },
      { name: "other" },
    ],
  },
  {
    name: "bcom",
    duration: 3,
    specialization: [{ name: "gen" }, { name: "hons" }, { name: "other" }],
  },
  {
    name: "mcom",
    duration: 2,
    specialization: [{ name: "gen" }, { name: "finance" }, { name: "other" }],
  },
  {
    name: "diploma",
    duration: 3,
    specialization: [
      { name: "me" },
      { name: "ce" },
      { name: "ee" },
      { name: "ece" },
      { name: "other" },
    ],
  },
  {
    name: "other",
    duration: 0,
    specialization: [{ name: "other" }],
  },
];

// ---------- OTHER SETTINGS ----------
const bookCategories = ["general", "book_bank", "donated", "other"];

const memberTypes = [
  "undergraduate",
  "postgraduate",
  "teacher_adhoc",
  "teacher_regular",
  "special_member",
  "other",
];

const libraryCardTypes = ["regular", "book_bank", "other"];

// ---------- FINE PER DAY ----------
const finePerDay = {
  undergraduate: 1,
  postgraduate: 1,
  teacher_adhoc: 1,
  teacher_regular: 1,
  special_member: 5,
  other: 2,
};

// ---------- AUTO-ALLOT LIMIT ----------
const autoAllotLimit = {
  type: "regular",
  limits: {
    undergraduate: 4,
    postgraduate: 4,
    teacher_adhoc: 5,
    teacher_regular: 7,
    special_member: 2,
    other: 1,
  },
};

// ---------- SEED FUNCTION ----------
export const seedSettings = async () => {
  await prisma.setting.upsert({
    where: { key: "PROGRAMS" },
    update: { value: samplePrograms },
    create: { key: "PROGRAMS", value: samplePrograms },
  });

  await prisma.setting.upsert({
    where: { key: "BOOKS-CATEGORIES" },
    update: { value: bookCategories },
    create: { key: "BOOKS-CATEGORIES", value: bookCategories },
  });

  await prisma.setting.upsert({
    where: { key: "MEMBER-TYPES" },
    update: { value: memberTypes },
    create: { key: "MEMBER-TYPES", value: memberTypes },
  });

  await prisma.setting.upsert({
    where: { key: "LIBRARY-CARD-TYPES" },
    update: { value: libraryCardTypes },
    create: { key: "LIBRARY-CARD-TYPES", value: libraryCardTypes },
  });

  await prisma.setting.upsert({
    where: { key: "FINE-PER-DAY" },
    update: { value: finePerDay },
    create: { key: "FINE-PER-DAY", value: finePerDay },
  });

  await prisma.setting.upsert({
    where: { key: "LIBRARY-CARD-AUTO-ALLOT-LIMIT" },
    update: { value: autoAllotLimit },
    create: { key: "LIBRARY-CARD-AUTO-ALLOT-LIMIT", value: autoAllotLimit },
  });

  console.log("✅ All settings seeded successfully!");
};

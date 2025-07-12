const getYearSuffix = () => {
  return new Date().getFullYear().toString().slice(-2); // e.g., "25"
};

const padNumber = (num, width) => {
  return String(num).padStart(width, "0");
};

// ✅ Application ID: LIB-25-001
export const generateApplicationId = (lastId = null) => {
  const year = getYearSuffix();
  let num = 1;

  if (lastId && lastId.startsWith(`LIB-${year}-`)) {
    const parts = lastId.split("-");
    const lastNum = parseInt(parts[2], 10);
    if (!isNaN(lastNum)) num = lastNum + 1;
  }

  return `LIB-${year}-${padNumber(num, 3)}`;
};

// ✅ Member ID: MEM-25-001
export const generateMemberId = (lastId = null) => {
  const year = getYearSuffix();
  let num = 1;

  if (lastId && lastId.startsWith(`MEM-${year}-`)) {
    const parts = lastId.split("-");
    const lastNum = parseInt(parts[2], 10);
    if (!isNaN(lastNum)) num = lastNum + 1;
  }

  return `MEM-${year}-${padNumber(num, 3)}`;
};

// ✅ Library Card ID: MEM-25-001-01
// Pass membershipId like "MEM-25-001", and lastCardId like "MEM-25-001-02"
export function generateLibraryCardId(lastCardId = null, memberId = null) {
  if (!lastCardId && memberId) {
    const parts = memberId.split("-");
    if (parts.length !== 3) return null;

    const year = parts[1];
    const memberNum = parts[2];
    return `CRD-${year}-${memberNum}-01`;
  }

  const parts = lastCardId?.split("-");
  if (!parts || parts.length !== 4) return null;

  const lastCopy = parseInt(parts[3], 10);
  if (isNaN(lastCopy)) return null;

  const nextCopy = String(lastCopy + 1).padStart(2, "0");
  return `${parts[0]}-${parts[1]}-${parts[2]}-${nextCopy}`;
}

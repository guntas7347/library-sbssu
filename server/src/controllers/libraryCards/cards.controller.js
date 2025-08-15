import { createLog } from "../../utils/log.js";
import { fetchSettings } from "../settings.controller.js";

export const getLCAAL = async (memberType) => {
  try {
    const { value } = await fetchSettings("LIBRARY-CARD-AUTO-ALLOT-LIMIT");
    const { limits } = value;
    const cardType = value.type;
    const cardLimit = limits[memberType];
    return { cardLimit, cardType };
  } catch (error) {
    createLog(error);
    return 0;
  }
};

export const getCardExpiry = async (batch, program) => {
  const { value } = await fetchSettings("PROGRAMS");
  const programConfig = value.find((p) => p.name === program);

  if (!programConfig) {
    throw new Error(`Program ${program} not configured in PROGRAMS`);
  }

  const { duration } = programConfig;

  // Convert safely to numbers
  let batchYear = Number(batch);
  if (Number.isNaN(batchYear)) {
    // Fallback if batch is invalid
    batchYear = new Date().getFullYear();
  }

  const durationYears = Number(duration) || 1;
  let expiryYear = batchYear + durationYears;

  // Clamp to Postgres supported max year
  if (expiryYear > 9999) expiryYear = 9999;

  const expiry = new Date(`${expiryYear}-07-31T00:00:00Z`);
  return expiry;
};

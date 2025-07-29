import { fetchSettings } from "../settings.controller.js";

export const getLCAAL = async (memberType) => {
  try {
    const { value } = await fetchSettings("LIBRARY-CARD-AUTO-ALLOT-LIMIT");
    const { limits } = value;
    const cardType = value.type;
    const cardLimit = limits[memberType];
    return { cardLimit, cardType };
  } catch (error) {
    return 0;
  }
};

export const getCardExpiry = async (batch, program) => {
  const { value } = await fetchSettings("PROGRAMS");
  const programConfig = value.find((p) => p.name === program);
  if (!programConfig)
    throw new Error(`Program ${program} not configured in PROGRAMS`);
  const { duration } = programConfig;
  const expiryYear = batch + duration;
  const expiry = new Date(`${expiryYear}-07-31`);

  return expiry;
};

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env: ${key}`);
  }
  return value;
};

export const config = {
  KOHA_BASE: required("KOHA_BASE"),
  KOHA_USER: required("KOHA_USER"),
  KOHA_PASS: required("KOHA_PASS"),
};

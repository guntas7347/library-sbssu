export function toPlain(data: any) {
  if (data === null || typeof data !== "object") return data;

  try {
    return JSON.parse(JSON.stringify(data));
  } catch {
    throw new Error("Failed to convert to plain data");
  }
}

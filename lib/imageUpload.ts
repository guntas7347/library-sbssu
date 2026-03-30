"use server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function uploadImage(formData: any) {
  const file = formData.get("image");

  if (!file) throw new Error("No file provided");

  if (file.type !== "image/jpeg") {
    throw new Error("Only JPEG images allowed");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "uploads");
  await mkdir(uploadDir, { recursive: true });

  const fileName = `${randomUUID()}.jpeg`;
  const filePath = path.join(uploadDir, fileName);

  await writeFile(filePath, buffer);

  return { fileName };
}

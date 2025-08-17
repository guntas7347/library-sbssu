import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function main() {
  try {
    // Path to JSON file (in same directory)
    const filePath = path.join(
      process.cwd(),
      "./src/utils/functions/5001-10200.json"
    );

    // Read file
    const rawData = fs.readFileSync(filePath, "utf-8");
    const booksData = JSON.parse(rawData);

    let count = 0;
    for (const item of booksData) {
      count++;
      // Create Book
      await prisma.book.create({
        data: {
          title: item.title ?? null,
          author: item.author ?? null,
          publicationYear: item.publicationYear
            ? String(item.publicationYear)
            : null,
          pages: item.pages ? String(item.pages) : null,
          volume: item.volume ?? null,
          source: item.source ?? null,
          cost: item.cost ? String(item.cost) : null,
          callNumber: item.callNumber ?? null,
          accessions: {
            create: {
              accessionNumber: item.accessions,
              condition: "unknown",
              status: "available",
            },
          },
        },
      });

      process.stdout.write(
        `Compleated: ${((count / booksData.length) * 100).toFixed(0)}%\r`
      );
    }

    console.log("✅ Bulk import completed!");
  } catch (error) {
    console.error("❌ Import failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

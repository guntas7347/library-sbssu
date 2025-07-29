// GUNTAS => READ COMMENT AT BOTTOM

import { promises as fs } from "fs";
import { PrismaClient } from "@prisma/client";
import path from "path";
import readline from "readline";

const prisma = new PrismaClient();

// Create readline interface to handle user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Main function to process and upload book data with multiple accessions.
 * @param {string} filePath - The path to the JSON file containing the book data.
 */
export async function uploadBooks(filePath) {
  let successfulUploads = 0;
  let failedUploads = 0;
  // Array to store the full JSON objects of books that failed to upload
  const failedBooksData = [];

  try {
    // 1. Read the JSON file from the provided path
    const data = await fs.readFile(filePath, "utf8");
    const books = JSON.parse(data);

    console.log(
      `Starting upload for ${books.length} books from ${path.basename(
        filePath
      )}...`
    );

    // 2. Iterate over each book object from the JSON file
    for (const bookData of books) {
      try {
        // --- Check for duplicates before the transaction ---
        if (
          !bookData.accessionNumbers ||
          !Array.isArray(bookData.accessionNumbers)
        ) {
          throw new Error("accessionNumbers field is missing or not an array.");
        }

        const existingAccessions = await prisma.accession.findMany({
          where: {
            accessionNumber: { in: bookData.accessionNumbers },
          },
          select: {
            accessionNumber: true,
          },
        });

        if (existingAccessions.length > 0) {
          const duplicateNumbers = existingAccessions.map(
            (a) => a.accessionNumber
          );
          throw new Error(
            `Duplicate accession numbers found: ${duplicateNumbers.join(", ")}`
          );
        }

        // --- End of new check ---

        // Use a Prisma transaction
        await prisma.$transaction(async (tx) => {
          const newBook = await tx.book.create({
            data: {
              title: bookData.title ? String(bookData.title) : null,
              author: bookData.author ? String(bookData.author) : null,
              placeAndPublishers: bookData.placeAndPublishers
                ? String(bookData.placeAndPublishers)
                : null,
              publicationYear: bookData.publicationYear
                ? String(bookData.publicationYear)
                : null,
              pages: bookData.pages ? String(bookData.pages) : null,
              volume: bookData.volume ? String(bookData.volume) : null,
              source: bookData.source ? String(bookData.source) : null,
              cost: bookData.cost ? String(bookData.cost) : null,
              callNumber: bookData.callNumber
                ? String(bookData.callNumber)
                : null,
              tags: [],
            },
          });

          const accessionsToCreate = bookData.accessionNumbers.map(
            (accNum) => ({
              accessionNumber: accNum,
              bookId: newBook.id,
              status: "available",
            })
          );

          await tx.accession.createMany({
            data: accessionsToCreate,
          });

          successfulUploads++;
        });
      } catch (error) {
        // If an error occurs, add the full book object to the failed data array
        failedUploads++;
        // Add the specific error message to the object for context
        const errorObject = { ...bookData, errorReason: error.message };
        failedBooksData.push(errorObject);
      }
    }
  } catch (error) {
    // This outer catch handles critical errors like failing to read the file.
    console.error(
      "A critical error occurred before processing individual books:",
      error
    );
  } finally {
    // --- Final Report ---
    console.log("---------------------------------");
    console.log("Upload process finished.");
    console.log(`\n--- SUMMARY ---`);
    console.log(`✅ Successful: ${successfulUploads} books`);
    console.log(`❌ Failed:     ${failedUploads} books`);

    // If there were any failures, write them to a dedicated error file
    if (failedBooksData.length > 0) {
      try {
        // Get the directory of the input file
        const inputFileDir = path.dirname(filePath);
        // Create an 'errors' directory inside the input file's directory
        const errorsDir = path.join(inputFileDir, "errors");
        await fs.mkdir(errorsDir, { recursive: true });

        // Construct the error filename based on the input filename
        const inputFileName = path.basename(filePath, path.extname(filePath));
        const errorFileName = `${inputFileName}-errors.json`;
        const errorFilePath = path.join(errorsDir, errorFileName);

        const jsonContent = JSON.stringify(failedBooksData, null, 2);
        await fs.writeFile(errorFilePath, jsonContent);
        console.log(
          `\n📝 Wrote details for ${failedBooksData.length} failed books to ${errorFilePath}`
        );
      } catch (writeError) {
        console.error("\nCould not write error file:", writeError);
      }
    }

    await prisma.$disconnect();
    console.log("\nPrisma Client disconnected.");
    // Close the readline interface so the script can exit
    rl.close();
  }
}

// --- How to run this script ---

// 1. Save your JSON data into a file (e.g., 'books-with-many-accessions.json').
// 2. Update the filePath below to point to your JSON file.
// 3. Run the script from your terminal using: `node your_script_name.js`

// Define the path to the JSON file.
const filePath = path.resolve(
  "./src/misc/library-data-json/acm/20201-21937-acm-errors.json"
);

// GUNTAS READ ME => below function.import it to app (only import). add file path in above file path. It needs acm type (all accessionNumbers key with numbers in book object itself.)

// rl.question(
//   "\nBooks Data uploader via prisma\nPress ENTER to start the upload process...\nDo not press ENTER if error occured\n\n",
//   () => {
//     // Call the main function to start the upload process
//     uploadBooks(filePath);
//   }
// );

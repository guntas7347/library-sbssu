import { z } from "zod";

const AccessionSchema = z.object({
  accessionNumber: z.coerce.number(),
  barcode: z.string().optional(),
  condition: z.string().optional(),
});

export const BookSchema = z.object({
  isbn: z.string().optional(),
  title: z.string().optional(),
  author: z.string().optional(),
  placeAndPublishers: z.string().optional(),
  publicationYear: z.string().optional(),
  edition: z.string().optional(),
  pages: z.string().optional(),
  volume: z.string().optional(),
  description: z.string().optional(),
  source: z.string().optional(),
  location: z.string().optional(),
  cost: z.string().optional(),
  callNumber: z.string().optional(),
  tags: z.array().optional(),
  accessions: z.array(AccessionSchema).optional(),
});

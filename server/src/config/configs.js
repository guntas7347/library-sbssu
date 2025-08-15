import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const UPLOADS_PATH = path.join(__dirname, "..", "..", "uploads");
export const REACT_BUILD_PATH = path.join(__dirname, "..", "..", "dist");
export const REACT_INDEX_PATH = path.join(
  __dirname,
  "..",
  "..",
  "dist",
  "index.html"
);

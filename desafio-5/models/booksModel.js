import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const booksFile = path.join(__dirname, "../data/books.json");

/**
 *Reads data/books.json file and returns a JSON Object.
 * @returns {JSON}
 */
export function readBooks() {
  try {
    const books = fs.readFileSync(booksFile, "utf-8");
    console.log("books in readBooks: ", books);
    return JSON.parse(books);
  } catch (error) {
    console.error(error.code);
  }
}

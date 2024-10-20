import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const booksFile = path.join(__dirname, "../data/books.json");

/**
 *Reads data/books.json file, parses data and returns an Array of books objects.
 * @returns {Array<Object>}
 */
export function readBooks() {
  try {
    const books = fs.readFileSync(booksFile, "utf-8");
    return JSON.parse(books);
  } catch (error) {
    console.error(error.code);
  }
}

export function writeBooks(data) {
  try {
    fs.writeFileSync(booksFile, JSON.stringify(data), "utf-8");
  } catch (error) {
    console.error("Error in booksModel.js, writeBooks(): ", error.message);
  }
}

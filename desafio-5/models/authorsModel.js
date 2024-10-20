import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const authorsFile = path.join(__dirname, "../data/authors.json");
const authors = fs.readFileSync(authorsFile, "utf-8");

/**
 *Reads data/authors.json file and returns a JSON Object.
 * @returns {JSON}
 */
export function readAuthors() {
  return JSON.parse(authors);
}

export function writeAuthors(data) {
  fs.writeFileSync(authorsFile, JSON.stringify(data), "utf-8");
}

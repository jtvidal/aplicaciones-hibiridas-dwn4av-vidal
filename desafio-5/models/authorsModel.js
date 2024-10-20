import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const authorsFile = path.join(__dirname, "../data/authors.json");
function readAuthors() {
  const authors = fs.readFileSync(authorsFile, "utf-8");
  console.log("authors in authorsModel: ", authors);
  return JSON.parse(authors);
}
export { readAuthors };

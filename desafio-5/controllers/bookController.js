import { readBooks } from "../models/booksModel.js";
class BooksController {
  constructor() {}
  async getBooks(req, res, next) {
    try {
      const books = readBooks();
      if (!books) res.status(404).json({ error: "404: books not found!" });
      res.status(200).json(books);
    } catch (error) {
      console.error("error in BooksController getBooks(); ", error.message);
    }
  }
}
export default new BooksController();

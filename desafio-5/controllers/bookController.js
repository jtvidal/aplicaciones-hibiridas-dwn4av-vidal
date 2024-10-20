import { readBooks, writeBooks } from "../models/booksModel.js";
const books = readBooks();
class BooksController {
  constructor() {}
  async getBooks(req, res, next) {
    try {
      if (!books) res.status(404).json({ error: "404: books not found!" });
      res.status(200).json(books);
    } catch (error) {
      console.error("error in BooksController getBooks(); ", error.message);
    }
  }

  getBooksById(req, res, next) {
    try {
      const bookId = parseInt(req.params.id);
      const bookIndex = books.findIndex((b) => b.id === bookId);
      if (bookIndex !== -1) {
        res.status(200).json(books[bookIndex]);
      } else {
        res.status(404).json({ error: "book not found" });
      }
    } catch (error) {
      console.error(
        "error in bookController.js, getBooksById: ",
        error.message
      );
      next(error);
    }
  }

  createBook(req, res, next) {
    try {
      const { title, author, year, genre } = req.body;
      const newBook = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        title,
        author,
        year,
        genre,
      };
      books.push(newBook);
      writeBooks(books);
      res.status(201).json(newBook);
    } catch (error) {
      next(error);
    }
  }

  editBook(req, res, next) {
    try {
      const editedData = req.body;
      const bookId = parseInt(req.params.id);
      if (!bookId) {
        res.status(400).json({ error: "param id missing" });
      } else {
        const bookIndex = books.findIndex((b) => b.id === bookId);
        if (bookIndex !== -1) {
          books[bookIndex] = { id: bookId, ...editedData };
          writeBooks(books);
          res.status(201).json(books[bookIndex]);
        } else {
          res.status(404).json({ error: "book not found" });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  deleteBook(req, res, next) {
    try {
      const bookId = parseInt(req.params.id);
      if (!bookId) {
        res.status(400).json({ error: "param id missing" });
      } else {
        const bookIndex = books.findIndex((b) => b.id === bookId);
        if (bookIndex !== -1) {
          books.splice(bookIndex, 1);
          writeBooks(books);
          res.status(204).json({ message: "book deleted" });
        } else {
          res.status(404).json({ error: "book not found" });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}
export default new BooksController();

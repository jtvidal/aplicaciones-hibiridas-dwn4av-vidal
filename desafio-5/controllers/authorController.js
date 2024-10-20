import { readAuthors, writeAuthors } from "../models/authorsModel.js";
const data = readAuthors();

class AuthorController {
  constructor() {}
  async getAuthors(req, res, next) {
    try {
      if (!data) {
        res.status(404).json({ error: "No authors found" });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error("Error in getAuthors: ", error.code);
      next(error);
    }
  }

  getAuthorById(req, res, next) {
    try {
      const userId = parseInt(req.params.id);
      if (!data) {
        res.status(404).json({ error: "No Authors found" });
      }
      const authorIndex = data.findIndex((a) => a.id === userId);
      if (authorIndex !== -1) {
        res.status(202).json(data[authorIndex]);
        return data[authorIndex];
      }
    } catch (error) {
      console.error(
        "error in AuthorController {getAuthorById} :",
        error.message
      );
      next(error);
    }
  }

  createAuthor(req, res, next) {
    try {
      if (!req.body) {
        res.status(400).json({ error: "req.body missing" });
      }
      const { name, nationality, birth_year, notable_work } = req.body;
      const newData = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        name,
        nationality,
        birth_year,
        notable_work,
      };
      console.log(newData);
      data.push(newData);
      writeAuthors(data);
      res.status(200).json(newData);
    } catch (error) {
      next(error);
    }
  }

  editAuthor(req, res, next) {
    try {
      const editedData = req.body;
      const authorId = parseInt(req.params.id);
      const authorIndex = data.findIndex((a) => a.id === authorId);
      if (authorIndex !== -1) {
        data[authorIndex] = { id: authorId, ...editedData };
        writeAuthors(data);
        res.status(200).json(data[authorIndex]);
      } else {
        res.status(404).json({ error: "Author not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  deleteAuthor(req, res, next) {
    try {
      const authorId = parseInt(req.params.id);
      const authorIndex = data.findIndex((a) => a.id === authorId);
      if (authorIndex !== -1) {
        data.splice(authorIndex, 1);
        res.status(204).json({ message: "Author deleted" });
      } else {
        res.status(404).json({ error: "Author not found" });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthorController();

import { readAuthors } from "../models/authorsModel.js";

class AuthorController {
  constructor() {}
  async getAuthors(req, res, next) {
    try {
      const data =  readAuthors();
      if (!data) {
        res.status(404).json({ error: "No authors found" });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error("Error in getAuthors: ", error.code);
      next(error);
    }
  }
}

export default new AuthorController();

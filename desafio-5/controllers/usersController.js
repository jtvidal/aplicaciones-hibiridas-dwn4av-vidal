import { readUsers, writeUsers } from "../models/userModel.js";
import bcrypt from "bcrypt";
const users = readUsers();

class UsersController {
  constructor() {}

  getUsers(req, res, next) {
    try {
      if (!users) {
        res.status(404).json({ error: "users not found" });
      } else {
        res.status(202).json(users);
      }
    } catch (error) {
      console.error("Error in userController, getUsers(): ", error.message);
      next(error);
    }
  }

  getUserById(req, res, next) {
    try {
      if (!req.params.id) {
        res.status(400).json({ error: "param id missing" });
      } else {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex((u) => u.id === userId);
        if (userIndex !== -1) {
          res.status(200).json(users[userIndex]);
        } else {
          res.status(404).json({ error: "user not found" });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        name,
        email,
        password: hashedPassword,
      };
      users.push(newUser);
      writeUsers(users);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  editUser(req, res, next) {
    try {
      if (!req.params.id) {
        res.status(400).json({ error: "param id missing" });
      } else {
        const newData = req.body;
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex((u) => u.id === userId);
        if (userIndex !== -1) {
          users[userIndex] = { id: userId, ...newData };
          writeUsers(users);
          res.status(200).json(users[userIndex]);
        } else {
          req.status(404).json({ error: "user not found" });
        }
      }
    } catch (error) {
      next(error);
    }
  }
  deleteUser(req, res, next) {
    try {
      if (!req.params.id) {
        res.status(400).json({ error: "param id missing" });
      } else {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex((u) => u.id === userId);
        if (userIndex !== -1) {
          users.splice(userIndex, 1);
          writeUsers(users);
          res.status(204).send();
        } else {
          res.status(404).json({ error: "user not found" });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();

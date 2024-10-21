import { readUsers, writeUsers } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
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

  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = users.find((u) => u.email === email);
      if (!user) {
        res.status(404).json({ error: "user not found" });
      } else {
        console.log("user in loginUser: ", user);

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          res.status(400).json({ error: "invalid password" });
        } else {
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "2h" }
          );
          res.status(200).json(token);
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();

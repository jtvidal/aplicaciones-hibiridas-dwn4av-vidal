import Users from "../models/usersModels.js";
import { usersValidation } from "../validation/validations.js";

class UsersController {
  constructor() {}

  async createUser(req, res, next) {
    const { error } = usersValidation(req.body);
    if (error) return res.status(400).json({ error: error.message });
    try {
      const newUser = new Users({ ...req.body });
      console.log(newUser);
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ error: "User not created" });
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await Users.find();
      if (!users) {
        res.status(404).json({ erro: "Users not found" });
      }
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await Users.findOne({ _id: userId });
      if (!user) {
        res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const userId = req.params.id;
      const data = req.body;
      const updatedUser = await Users.findOneAndUpdate({ _id: userId }, data, {
        new: true,
      });
      if (!updatedUser) {
        res.status(404).json({ error: "Could not update user" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const userId = req.params.id;
      const deletedUser = await Users.findOneAndDelete(
        { _id: userId },
        { includeResultMetadata: true }
      );
      if (!deletedUser) {
        res.status(404).json({ error: "Could not delete user" });
      }
      res.status(200).json({ deleted: deletedUser });
    } catch (error) {
      res.status(400).json({ error: error.message });
      next(error);
    }
  }
}

export default new UsersController();

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

  // async getUserById(req, res, next) {
  //   try {

  //   } catch (error) {}
  // }
}

export default new UsersController();

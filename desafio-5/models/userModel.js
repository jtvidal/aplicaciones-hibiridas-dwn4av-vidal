import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFile = path.join(__dirname, "../data.users.json");

export function readUsers() {
  try {
    const users = fs.readFileSync(usersFile, "utf-8");
    if (!users) {
      throw new Error("Users File not found");
    } else {
      return JSON.parse(users);
    }
  } catch (error) {
    console.error("error in userModel.js, readUsers(): ", error.message);
  }
}

export function writeUsers(data) {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(data), "utf-8");
  } catch (error) {
    console.error("Error in userModel.js, writeUsers(): ", error.message);
  }
}

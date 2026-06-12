const express = require("express");
const { getAllUsers } = require("../Controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { roleCheckMiddleware } = require("../middleware/roleCheckMiddleware");

const routee = express.Router();

// admin-only: list users
routee.get("/all", authMiddleware, roleCheckMiddleware("admin"), getAllUsers);

module.exports = routee;

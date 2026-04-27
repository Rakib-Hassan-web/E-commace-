const express = require('express')
const { createNewCategory } = require('../Controllers/categoryController')
const { roleCheckMiddleware, GetAllCategories } = require('../middleware/roleCheckMiddleware')

const routee = express.Router()
const multer  = require('multer')
const authMiddleware = require('../middleware/authMiddleware')

const upload = multer()

routee.post("/create", authMiddleware, roleCheckMiddleware("admin"), upload.single("thumbnail"), createNewCategory
)

routee.get("/all", GetAllCategories)

module.exports = routee

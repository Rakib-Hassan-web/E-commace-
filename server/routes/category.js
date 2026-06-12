const express = require('express')
const { createNewCategory, updateCategory, deleteCategory } = require('../Controllers/categoryController')
const { roleCheckMiddleware, GetAllCategories } = require('../middleware/roleCheckMiddleware')

const routee = express.Router()
const multer  = require('multer')
const authMiddleware = require('../middleware/authMiddleware')

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
})

routee.post("/create", authMiddleware, roleCheckMiddleware("admin"), upload.single("thumbnail"), createNewCategory)
routee.patch("/:id/update", authMiddleware, roleCheckMiddleware("admin"), upload.single("thumbnail"), updateCategory)
routee.delete("/:id/delete", authMiddleware, roleCheckMiddleware("admin"), deleteCategory)

routee.get("/all",authMiddleware, GetAllCategories)

module.exports = routee

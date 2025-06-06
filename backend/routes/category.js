const express = require('express');
const authController = require("../controllers/category");
const router = express.Router();

router.post("/", authController.createCategory)

router.get("/", authController.getAllCategories)

router.delete("/:id", authController.deleteCategory)

module.exports = router;
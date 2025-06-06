const express = require('express');
const router = express.Router();

const isAuth = require("../middleware/auth")
const upload = require("../middleware/uploadImage");
const authController = require('../controllers/auth');

router.post("/signUp", upload.single("image"), authController.signUp)

router.post('/login', authController.login)

router.get("/:id", isAuth, authController.getMe)


module.exports = router;
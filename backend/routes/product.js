const express = require("express")

const router = express.Router()

const upload = require("../middleware/uploadImage");
const productController = require("../controllers/product")

router.post("/", upload.single("image"), productController.create)

router.get("/", productController.getAll)

module.exports = router;
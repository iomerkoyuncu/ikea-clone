const express = require("express")
const router = express.Router()

const {
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
	createProduct,
} = require("../controllers/productController")
const { protect } = require("../middlewares/authMiddleware")

router.route("/").get(protect, getProducts).post(protect, createProduct)
router
	.route("/:id")
	.get(protect, getProduct)
	.put(protect, updateProduct)
	.delete(protect, deleteProduct)

module.exports = router

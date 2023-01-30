const asyncHandler = require("express-async-handler")

const User = require("../models/userModel")
const Product = require("../models/productModel")

//@desc 	Get user product
//@route 	GET /api/products/:id
//@access Private
const getProduct = asyncHandler(async (req, res) => {
	// Get user using the id in the JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	const product = await Product.findById(req.params.id)

	if (!product) {
		res.status(404)
		throw new Error("Product not found.")
	}

	if (product.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error("Not Authorized")
	}

	res.status(200).json(product)
})

//@desc 	Get user products
//@route 	GET /api/products
//@access Private
const getProducts = asyncHandler(async (req, res) => {
	// Get user using the id in the JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	const products = await Product.find({ user: req.user.id })

	res.status(200).json(products)
})

//@desc 	Create product
//@route 	POST /api/products
//@access Private
const createProduct = asyncHandler(async (req, res) => {
	const { title, description, color, price, categories } = req.body


	/*
	if (!title || !description) {
		res.status(400)
		throw new Error("Please add the product information")
	}
	*/

	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	const product = await Product.create({
		user: req.user.id,
		title,
		description,
		color,
		price,
		categories,
		img: req.file.path,
	})

	res.status(201).json({ ok: "ok" })
})

//@desc 	Update product
//@route 	PUT /api/products/:id
//@access Private
const updateProduct = asyncHandler(async (req, res) => {
	// Get user using the id in the JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	const product = await Product.findById(req.params.id)

	if (!product) {
		res.status(404)
		throw new Error("Product not found.")
	}

	if (product.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error("Not Authorized")
	}

	const updatedProduct = await Product.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	)

	res.status(200).json(updatedProduct)
})

//@desc 	Delete product
//@route 	DELETE /api/products/:id
//@access Private
const deleteProduct = asyncHandler(async (req, res) => {
	// Get user using the id in the JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	const product = await Product.findById(req.params.id)

	if (!product) {
		res.status(404)
		throw new Error("Product not found.")
	}

	if (product.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error("Not Authorized")
	}

	await product.remove()

	res.status(200).json({ success: true })
})

module.exports = {
	getProducts,
	getProduct,
	deleteProduct,
	updateProduct,
	createProduct,
}

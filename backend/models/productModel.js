const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		categories: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model("Product", productSchema)

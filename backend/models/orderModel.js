const mongoose = require("mongoose")

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		products: [
			{
				productId: {
					type: String,
				},
				quantity: {
					type: Number,
					default: 1,
				},
			},
		],
		amount: {
			type: Number,
			required: true,
		},
		address: {
			type: Object,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "delivered"],
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model("Order", orderSchema)

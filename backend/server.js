const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()

const connectDB = require("./config/db")

const errorHandler = require("./middlewares/errorMiddleware")

const Grid = require("gridfs-stream")
const mongoose = require("mongoose")
let gfs

const PORT = process.env.PORT || 3001

// Connect to database
connectDB()

const conn = mongoose.connection
conn.once("open", () => {
	gfs = Grid(conn.db, mongoose.mongo)
	gfs.collection("photos")
})


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to the ikea-clone API" })
})

//Routes
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/products", require("./routes/productRoutes"))
app.use("/api/upload", require("./routes/uploadRoutes"))

app.get("/uploads/:filename", async (req, res) => {
	try {
		const file = await gfs.files.findOne({ filename: req.params.filename })
		const readStream = gfs.createReadStream(file.filename)
		readStream.pipe(res)
	}
	catch (err) {
		console.log(err)
	}
})

app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})

const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()

const connectDB = require("./config/db")

const errorHandler = require("./middlewares/errorMiddleware")

const PORT = process.env.PORT || 3001

// Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to the ikea-clone API" })
})

//Routes
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})

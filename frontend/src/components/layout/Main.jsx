import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Home from "../../pages/Home"
import Login from "../../pages/Login"
import Register from "../../pages/Register"

function Main() {
	return (
		<main>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</main>
	)
}

export default Main

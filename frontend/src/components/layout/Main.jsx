import React from "react"
import { Route, Routes } from "react-router-dom"

import Home from "../../pages/Home"
import Login from "../../pages/Login"
import Register from "../../pages/Register"
import UserSellings from "../../pages/UserSellings"
import Profile from "../../pages/Profile"
import NotFound from "../../pages/NotFound"
import Favourites from "../../pages/Favourites"
import Cart from "../../pages/Cart"
import CreateProduct from "../../pages/CreateProduct"

function Main() {
	return (
		<main>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/sellings' element={<UserSellings />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/favourites' element={<Favourites />} />
				<Route path='/new-product' element={<CreateProduct />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</main>
	)
}

export default Main

import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Navbar from "../src/components/layout/Navbar"
import Main from "../src/components/layout/Main"
import Footer from "../src/components/layout/Footer"

function App() {
	return (
		<>
			<Router>
				<div className='flex flex-col justify-between h-screen'>
					<Navbar />
					<Main />
					<Footer />
				</div>
			</Router>
			<ToastContainer />
		</>
	)
}

export default App

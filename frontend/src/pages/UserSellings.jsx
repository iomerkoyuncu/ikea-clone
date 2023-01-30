import React from "react"
import { Link } from "react-router-dom"

function UserSellings() {
	return (
		<h1 className='text-center'>
			You have no sellings. <br />
			You can sell your product by clicking{" "}
			<Link to='/new-product'>
				<span className='underline'>here.</span>
			</Link>
		</h1>
	)
}

export default UserSellings

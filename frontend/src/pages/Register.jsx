import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { register } from "../features/auth/authSlice"

import { styled } from "@mui/material/styles"
import { TextField, Typography, Box, Stack, Button } from "@mui/material"

const StyledTextField = styled(TextField)({
	width: "300px",
})

export default function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	})
	const [matchError, setMatchError] = useState(false)
	const [matchHelper, setmatchHelper] = useState("")

	const { name, email, password, password2 } = formData

	const dispatch = useDispatch()
	const { user, isLoading, isSuccess, message } = useSelector(
		(state) => state.auth
	)

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

	const onSubmit = (e) => {
		e.preventDefault()

		setMatchError(password === password2 ? false : true)
		setmatchHelper(password === password2 ? "" : "Passwords do not match.")

		if (password === password2) {
			const userData = {
				name,
				email,
				password,
			}

			dispatch(register(userData))
		}
	}

	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Stack sx={{ width: "90vw" }}>
					<Typography textAlign='center' variant='h4' gutterBottom>
						Sign Up Form
					</Typography>
					<div className='flex justify-center'>
						<hr className='w-1/2 border ' />
					</div>

					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							padding: "20px",
						}}>
						<form onSubmit={onSubmit}>
							<Stack spacing={2}>
								<StyledTextField
									type='text'
									id='name'
									name='name'
									value={name}
									onChange={onChange}
									variant='outlined'
									label='Name'
									required></StyledTextField>
								<StyledTextField
									type='email'
									id='email'
									name='email'
									value={email}
									onChange={onChange}
									variant='outlined'
									label='Email address'
									required></StyledTextField>
								<StyledTextField
									type='password'
									id='password'
									name='password'
									value={password}
									onChange={onChange}
									variant='outlined'
									label='Password'
									required></StyledTextField>
								<StyledTextField
									error={matchError}
									helperText={matchHelper}
									type='password'
									id='password2'
									name='password2'
									value={password2}
									onChange={onChange}
									variant='outlined'
									label='Re-enter password'
									required></StyledTextField>
								<Button type='submit' variant='contained'>
									Save
								</Button>
							</Stack>
						</form>
					</Box>

					<Link to='/login'>
						<p className='text-center text-[#1F4690]'>
							Already have an account?
						</p>
					</Link>
				</Stack>
			</Box>
		</>
	)
}

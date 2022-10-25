import React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { register, reset } from "../features/auth/authSlice"
import { toast } from "react-toastify"
import Spinner from "../assets/spinner.gif"

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
	const navigate = useNavigate()

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	)

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		// Redirect when logged in
		if (isSuccess || user) {
			navigate("/")
		}

		dispatch(reset())
	}, [isError, isSuccess, user, message, dispatch, navigate])

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

	if (isLoading) {
		return (
			<div className='w-100 mt-20'>
				<img
					width={120}
					className='text-center mx-auto'
					src={Spinner}
					alt='Loading'
				/>
			</div>
		)
	} else {
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
}

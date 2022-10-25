import React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "../features/auth/authSlice"
import { toast } from "react-toastify"
import Spinner from "../assets/spinner.gif"

import { styled } from "@mui/material/styles"
import { TextField, Typography, Box, Stack, Button } from "@mui/material"

const StyledTextField = styled(TextField)({
	width: "300px",
})

export default function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})

	const { email, password } = formData

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	)

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

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

	const onSubmit = (e) => {
		e.preventDefault()

		const userData = {
			email,
			password,
		}

		dispatch(login(userData))
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
				<Box display='flex' justifyContent='center'>
					<Box
						sx={{
							width: "60vw",
							display: "flex",
							flexDirection: {
								xs: "column",
								md: "row",
							},
							justifyContent: "space-evenly",
						}}>
						<Box>
							<Box sx={{ display: "flex", justifyContent: "center" }}>
								<Stack>
									<form onSubmit={onSubmit}>
										<Typography paddingLeft='20px' variant='h6' gutterBottom>
											Login
										</Typography>
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												padding: "20px",
											}}>
											<Stack spacing={2}>
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
											</Stack>
										</Box>
										<Box sx={{ display: "flex", justifyContent: "center" }}>
											<Stack direction='row' padding='10px' spacing={2}>
												<Button type='submit' variant='contained'>
													Login
												</Button>
											</Stack>
										</Box>
									</form>
								</Stack>
							</Box>
						</Box>
						<Box
							sx={{
								borderLeft: {
									xs: "0px",
									md: "black solid 1px",
								},
							}}></Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Box
								sx={{
									width: "400px",
									height: "100%",
									display: "flex",
									padding: "20px",
									flexDirection: "column",
									justifyContent: "space-evenly",
								}}>
								<Typography variant='h6'>Don't have an account yet?</Typography>
								<p className='text-justify'>
									Create an IKEA account to complete your purchase of
									beautifully designed, functional and high quality furniture
									and home accessories easily and quickly.
								</p>
								<Box sx={{ display: "flex", justifyContent: "center" }}>
									<Stack direction='row' padding='10px' spacing={2}>
										<Link to='/register'>
											<Button variant='outlined'>Sign Up</Button>
										</Link>
									</Stack>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</>
		)
	}
}

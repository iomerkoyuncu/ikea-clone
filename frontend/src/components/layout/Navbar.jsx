import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout, reset } from "../../features/auth/authSlice"

import { ReactComponent as Logo } from "../../assets/logo.svg"

import { styled } from "@mui/material/styles"
import {
	Box,
	AppBar,
	Toolbar,
	Stack,
	InputBase,
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	Divider,
} from "@mui/material"

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import SearchIcon from "@mui/icons-material/Search"
import MenuIcon from "@mui/icons-material/Menu"
import Logout from "@mui/icons-material/Logout"
import ListItemIcon from "@mui/material/ListItemIcon"

const StyledToolbar = styled(Toolbar)({
	backgroundColor: "#fff",
	color: "#000",
	display: "flex",
	justifyContent: "center",
})

const StyledAppBar = styled(AppBar)({
	boxShadow: "0px 0px",
	position: "sticky",
	marginTop: "20px",
})

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	marginLeft: 0,
	width: "100%",
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "#000",
	backgroundColor: "#f5f5f5",
	borderRadius: "50px",
	"&:hover": {
		backgroundColor: "#e0e0e0",
	},
	"& .MuiInputBase-input": {
		padding: "10px",
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		width: "40vw",
	},
}))

function Navbar() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { user } = useSelector((state) => state.auth)

	const onLogout = () => {
		dispatch(logout())
		dispatch(reset())
		navigate("/")
	}

	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<Box>
				<StyledAppBar>
					<StyledToolbar>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								width: "85vw",
							}}>
							<Stack
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-evenly",
									width: "20vw",
								}}>
								<IconButton
									size='large'
									edge='start'
									color='inherit'
									aria-label='menu'
									sx={{ mr: 2 }}>
									<MenuIcon />
								</IconButton>
								<Box>
									<Link to='/'>
										<Logo />
									</Link>
								</Box>
							</Stack>
							<Stack>
								<Search
									sx={{
										display: {
											xs: "none",
											sm: "none",
											md: "flex",
										},
									}}>
									<SearchIconWrapper>
										<SearchIcon
											sx={{
												zIndex: "1",
											}}
										/>
									</SearchIconWrapper>
									<StyledInputBase
										placeholder='Search…'
										inputProps={{ "aria-label": "search" }}
									/>
								</Search>
							</Stack>
							<Stack
								sx={{
									width: "20vw",
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
								}}>
								{user ? (
									<IconButton
										size='large'
										edge='start'
										color='inherit'
										onClick={handleClick}
										sx={{ mr: 2 }}
										aria-controls={open ? "account-menu" : undefined}
										aria-haspopup='true'
										aria-expanded={open ? "true" : undefined}>
										<PersonOutlinedIcon />
									</IconButton>
								) : (
									<Link to='/login'>
										<IconButton
											size='large'
											edge='start'
											color='inherit'
											aria-label='menu'
											sx={{ mr: 2 }}>
											<PersonOutlinedIcon />
										</IconButton>
									</Link>
								)}

								<IconButton
									size='large'
									edge='start'
									color='inherit'
									aria-label='menu'
									sx={{ mr: 2 }}>
									<FavoriteBorderOutlinedIcon />
								</IconButton>
								<IconButton
									size='large'
									edge='start'
									color='inherit'
									aria-label='menu'
									sx={{ mr: 2 }}>
									<ShoppingCartOutlinedIcon />
								</IconButton>
							</Stack>
							<Menu
								anchorEl={anchorEl}
								id='account-menu'
								open={open}
								onClose={handleClose}
								onClick={handleClose}
								PaperProps={{
									elevation: 0,
									sx: {
										overflow: "visible",
										filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
										mt: 1.5,
										"& .MuiAvatar-root": {
											width: 32,
											height: 32,
											ml: -0.5,
											mr: 1,
										},
										"&:before": {
											content: '""',
											display: "block",
											position: "absolute",
											top: 0,
											right: 14,
											width: 10,
											height: 10,
											bgcolor: "background.paper",
											transform: "translateY(-50%) rotate(45deg)",
											zIndex: 0,
										},
									},
								}}
								transformOrigin={{ horizontal: "right", vertical: "top" }}
								anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
								<MenuItem>
									<Avatar /> Profile
								</MenuItem>

								<Divider />
								<MenuItem onClick={onLogout}>
									<ListItemIcon>
										<Logout fontSize='small' />
									</ListItemIcon>
									Logout
								</MenuItem>
							</Menu>
						</Box>
					</StyledToolbar>
				</StyledAppBar>
				<StyledAppBar
					sx={{
						display: {
							sm: "flex",
							md: "none",
						},
					}}>
					<StyledToolbar>
						<Box>
							<Search>
								<SearchIconWrapper>
									<SearchIcon
										sx={{
											zIndex: "1",
										}}
									/>
								</SearchIconWrapper>
								<StyledInputBase
									sx={{ width: "80vw" }}
									placeholder='Search…'
									inputProps={{ "aria-label": "search" }}
								/>
							</Search>
						</Box>
					</StyledToolbar>
				</StyledAppBar>
			</Box>
		</>
	)
}

export default Navbar

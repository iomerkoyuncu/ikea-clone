import React from "react"
import { Link } from "react-router-dom"

import { ReactComponent as Logo } from "../../assets/logo.svg"

import { theme } from "../theme/theme"
import { styled, alpha } from "@mui/material/styles"
import {
	Box,
	Typography,
	AppBar,
	Toolbar,
	Grid,
	Stack,
	Button,
	InputBase,
	IconButton,
} from "@mui/material"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import SearchIcon from "@mui/icons-material/Search"
import MenuIcon from "@mui/icons-material/Menu"

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

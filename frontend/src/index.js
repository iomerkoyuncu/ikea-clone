import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./index.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { theme } from "./components/theme/theme.js"

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<React.StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</React.StrictMode>
	</ThemeProvider>
)

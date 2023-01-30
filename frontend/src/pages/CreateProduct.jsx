import React, { useState } from "react"
import { FilePond, registerPlugin } from "react-filepond"

import "filepond/dist/filepond.min.css"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

import FilePondPluginImageResize from "filepond-plugin-image-resize"
import FilePondPluginFileEncode from "filepond-plugin-file-encode"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"

import axios from "axios"

import { styled } from "@mui/material/styles"
import {
	TextField,
	Button,
	Typography,
	Stack,
	InputAdornment,
} from "@mui/material"

// Register the plugins
registerPlugin(
	FilePondPluginFileEncode,
	FilePondPluginImagePreview,
	FilePondPluginImageResize
)

const StyledTextField = styled(TextField)({
	width: "300px",
})

function CreateProduct() {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		categories: "",
		color: "",
		price: "",
	})

	const { title, description, categories, color, price } = formData

	const [files, setFiles] = useState([])

	const postProduct = async (productData) => {
		console.log(productData)

		const response = await axios({
			url: "/api/products",
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTkyNzc2N2NhMjNkNDNlMzA2YzhiNCIsImlhdCI6MTY2NzAzMzk1MiwiZXhwIjoxNjY5NjI1OTUyfQ.gHNSb33w6rIE1kqu_SCRbspeHCnKDDccIy8grj0s5zA`,
			},
			data: productData,
		})

		if (response.data) {
			console.log(response.data)
		}
		return response.data
	}
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

	const onSubmit = (e) => {
		e.preventDefault()
		const img = files[0].file
		const productData = {
			title,
			description,
			categories,
			color,
			price,
			img,
		}

		postProduct(productData)
	}

	return (
		<>
			<Stack display='flex' justifyContent='center'>
				<form onSubmit={onSubmit}>
					<Stack
						direction='column'
						sx={{ backgroundColor: "gray", width: "300px" }}
						spacing={2}>
						<label>title</label>
						<input
							type='text'
							id='title'
							name='title'
							value={title}
							onChange={onChange}
						/>
						<label>desc</label>
						<input
							type='text'
							id='description'
							name='description'
							value={description}
							onChange={onChange}
						/>
						<label>categories</label>
						<input
							type='text'
							id='categories'
							name='categories'
							value={categories}
							onChange={onChange}
						/>
						<label>color</label>
						<input
							type='text'
							id='color'
							name='color'
							value={color}
							onChange={onChange}
						/>
						<label>price</label>
						<input
							type='text'
							id='price'
							name='price'
							value={price}
							onChange={onChange}
						/>
						<label>image</label>
						<FilePond
							files={files}
							onupdatefiles={setFiles}
							name='files'
							allowMultiple={true}
							maxFiles={3}
							labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
						/>
						<button type='submit'>SAVE</button>
					</Stack>
				</form>
			</Stack>
		</>
	)
}

export default CreateProduct

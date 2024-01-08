import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { checkEmptyFormFields } from "../../utils/Utils"
import { REGISTER_URL } from "../../const"

export default function Register() {
	
	const [form, setForm] = useState({
		username: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
	})

	const navigate = useNavigate()

	function handleChange(event) {
		setForm({
			...form,
			[event.target.name]: event.target.value
		})
	}

	async function register(event) {
		event.preventDefault();
		
		let errMessage = checkEmptyFormFields(form)
		if (errMessage.length != 0) {
			alert(errMessage)
			return
		}

		if (form.password !== form.confirmPassword) {
			alert("Passwords must match")
			return
		}

		const body = {
			"username": form.username.trim(),
			"first_name": form.firstName.trim(),
			"last_name": form.lastName.trim(),
			"password": form.password,
		}

		try{
			const response = await fetch(REGISTER_URL, {
				method: 'POST',
				body: JSON.stringify(body)
			})
			if (response.status != 200) {
				const errText = await response.text()
				alert(errText)
				return
			}

			const respJson = await response.json()
			localStorage.setItem("username", respJson.username)
			localStorage.setItem("firstName", respJson.first_name)
			localStorage.setItem("lastName", respJson.last_name)
			localStorage.setItem("userId", respJson.id)

			navigate("../polls") 
			window.location.reload()
		} catch (error) {
			alert(error)
		}
	}
	
	return (
		<div className="center box">
			<h3>Register</h3>
			<form onSubmit={register}>
				<div className="form-grid">
					<label htmlFor="username">Username:</label>
					<input name="username"
						type="text"
						value={form.username}
						onChange={handleChange} />

					<label htmlFor="firstName">First Name:</label>
					<input name="firstName"
						type="text"
						value={form.firstName}
						onChange={handleChange} />

					<label htmlFor="lastName">Last Name:</label>
					<input name="lastName"
						type="text"
						value={form.lastName}
						onChange={handleChange} />

					<label htmlFor="password">Password:</label>
					<input name="password"
						 type="password"
						 value={form.password}
						 onChange={handleChange} />

					<label htmlFor="confirmPassword">Confirm Password:</label>
					<input name="confirmPassword"
						 type="password"
						 value={form.confirmPassword}
						 onChange={handleChange} />
				</div>

				<button type="submit">Register</button>
			</form>
		</div>
	)
}
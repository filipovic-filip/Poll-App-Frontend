import { useState } from "react"
import { checkEmptyFormFields } from "../../utils/Utils";
import { LOGIN_URL } from "../../const";
import { useNavigate } from "react-router-dom";

export default function Login() {

	const [form, setForm] = useState({
		username: '',
		password: '',
	})

	const navigate = useNavigate()

	function handleChange(event) {
		setForm({
			...form,
			[event.target.name]: event.target.value
		})
	}
	
	async function login(event) {
		event.preventDefault();
		
		let errMessage = checkEmptyFormFields(form)
		if (errMessage.length != 0) {
			alert(errMessage)
			return
		}

		const body = {
			"username": form.username.trim(),
			"password": form.password,
		}

		try{
			const response = await fetch(LOGIN_URL, {
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
			<h3>Log in</h3>
			<form onSubmit={login}>
				<div className="form-grid">
					<label htmlFor="username">Username:</label>
					<input name="username"
						type="text"
						value={form.username}
						onChange={handleChange} />

					<label htmlFor="password">Password:</label>
					<input name="password"
						 type="password"
						 value={form.password}
						 onChange={handleChange} />
				</div>

				<button type="submit">Log in</button>
			</form>
		</div>
	)
}
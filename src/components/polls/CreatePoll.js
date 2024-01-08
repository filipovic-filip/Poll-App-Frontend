import { useState } from "react"
import './PollCard.css'
import { useNavigate } from "react-router-dom"
import { checkEmptyFormFields } from "../../utils/Utils"
import { CREATE_POLL_PATH } from "../../const"

export default function CreatePoll() {

	const [pollOptions, setPollOptions] = useState([])
	const [form, setForm] = useState({
		"name": '',
		"description": ''
	})

	const navigate = useNavigate()

	function handleFormChange(event) {
		setForm({
			...form,
			[event.target.name]: event.target.value
		})
	}

	function handlePollOptionChange(event, index) {
		let data = [...pollOptions]
		data[index] = event.target.value
		setPollOptions(data)
	}

	function addPollOption(event) {
		event.preventDefault()
		setPollOptions([...pollOptions, ''])
	}

	function deletePollOption(event, index) {
		event.preventDefault()
		let data = [...pollOptions];
    	data.splice(index, 1)
    	setPollOptions(data)
	}

	function makeBody() {
		let opts = []
		pollOptions.forEach( (optName) => {
			opts.push({"name": optName.trim()})
		})

		const body = {
			"name": form.name.trim(),
			"created_by_username": localStorage.getItem("username"),
			"poll_options": opts
		}
		
		let desc = form.description.trim()
		if (desc.length > 0) {
			body["description"] = desc.trim()
		}

		return body
	}

	async function createPoll(event) {
		event.preventDefault()
		
		let errMessage = checkEmptyFormFields(form, ["description"])
		if (errMessage.length != 0) {
			alert(errMessage)
			return
		}

		if (pollOptions.length == 0) {
			alert("Poll has to have at least one poll option")
			return
		}

		for (let opt of pollOptions) {
			if(opt.trim().length == 0) {
				alert("Poll option can't be empty")
				return
			}
		}

		const body = makeBody()
		try{
			const response = await fetch(CREATE_POLL_PATH, {
				method: 'POST',
				body: JSON.stringify(body)
			})
			if (response.status != 200) {
				const errText = await response.text()
				alert(errText)
				return
			}

			const respJson = await response.json()
			navigate(`../poll/view/${respJson.id}`) 
		} catch (error) {
			alert(error)
		}
	}

	const pollOptionViews = pollOptions.map((input, index) => (
			<div key={index} className="poll-options">
				<label htmlFor="optionName">Name:</label>
						<input name="optionName"
							type="text"
							value={input}
							onChange={(event) => handlePollOptionChange(event, index)} />
			
			<button className="x-button" onClick={(event) => deletePollOption(event, index)}>X</button>
			</div>
	))

	return (
		<div className="center box">
			<h3>Create Poll</h3>
			<form onSubmit={createPoll}>
				<div className="form-grid">
					<label htmlFor="name">Name:</label>
					<input name="name"
						type="text"
						value={form.name}
						onChange={handleFormChange} />

					<label htmlFor="description">Description:</label>
					<input name="description"
						 type="text"
						 value={form.description}
						 onChange={handleFormChange} />
				</div>

				<h4>Poll Options</h4>
				{pollOptionViews}
				<button onClick={addPollOption}>Add Poll Option</button>
				<button type="submit">Create Poll</button>
			</form>
		</div>
	)
}
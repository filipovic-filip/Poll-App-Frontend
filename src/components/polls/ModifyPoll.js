import { useEffect, useState } from "react";
import "./PollCard.css"
import { GET_POLL_PATH, MODIFY_POLL_PATH } from "../../const";
import { useNavigate, useParams } from "react-router-dom";

export default function ModifyPoll() {
	
	const [pollResp, setPollResp] = useState()
	const [deleteOptions, setDeleteOptions] = useState([])
	const [addOptions, setAddOptions] = useState([])
	const { pollId } = useParams()

	const navigate = useNavigate()

	useEffect(() => {
		getPollData()
	}, [])

	function getPollData() {
		fetch(`${GET_POLL_PATH}/${pollId}?username=${localStorage.getItem("username")}`)
		  .then((res) => {
			return res.json();
		  })
		  .then((data) => {
			setPollResp(data);
		  });
	}

	function handleFormChange(event) {
		let data = {...pollResp}
		data.poll[event.target.name] = event.target.value
		setPollResp(data)
	}

	function handleAddPollOptionChange(event, index) {
		let data = [...addOptions]
		data[index] = event.target.value
		setAddOptions(data)
	}

	function deletePollOption(event, index) {
		event.preventDefault()
		let data = [...deleteOptions]
		let i = data.indexOf(index)
		
		if (i < 0) {
			data.push(index)
		} else {
			data.splice(i, 1)
		}

		setDeleteOptions(data)
	}

	function addPollOption(event) {
		event.preventDefault()
		setAddOptions([...addOptions, ''])
	}

	function deleteAddedPollOption(event, index) {
		event.preventDefault()
		let data = [...addOptions];
    	data.splice(index, 1)
    	setAddOptions(data)
	}

	function makeBody() {
		let deleteIds = []
		for (let index of deleteOptions) {
			deleteIds.push(pollResp.poll.edges.poll_options[index].id)
		}

		let addedOptions = []
		for (let opt of addOptions) {
			addedOptions.push({"name": opt.trim()})
		}

		return {
			"id": Number(pollId),
			"name": pollResp.poll.name.trim(),
			"description": pollResp.poll.description.trim(),
			"delete_poll_option_ids": deleteIds,
			"add_poll_options": addedOptions
		}
	}
	
	async function modifyPoll(event) {
		event.preventDefault()
	
		if (pollResp?.poll.name.trim().length === 0) {
			alert("Name can't be empty")
			return
		}

		if (deleteOptions.length == pollResp?.poll.edges.poll_options?.length && addOptions.length == 0) {
			alert("Poll has to have at least 1 poll option")
			return
		}

		for (let opt of addOptions) {
			if (opt.trim().length == 0) {
				alert("Added poll options can't be empty")
				return
			}
		}

		const body = makeBody()
		console.log(body)
		try{
			const response = await fetch(MODIFY_POLL_PATH, {
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
	
	const pollOptions = pollResp?.poll.edges.poll_options?.map((option, index) => (
		<div key={option.id} className={"poll-option-modify " + (deleteOptions.includes(index) ? "removed" : "")}>
			<div className="poll-option-name">{option.name}</div>
			<button className="x-button" onClick={(event) => deletePollOption(event, index)}>X</button>
		</div>
	))

	const addedPollOptions = addOptions.map((input, index) => (
		<div key={index} className="poll-option-added">
				<label htmlFor="optionName">Name:</label>
						<input name="optionName"
							type="text"
							value={input}
							onChange={(event) => handleAddPollOptionChange(event, index)} />
			
			<button className="x-button" onClick={(event) => deleteAddedPollOption(event, index)}>X</button>
		</div>
	))

	return (
		<div className="center box">
			<h3>Modify Poll</h3>
			<form onSubmit={modifyPoll}>
				<div className="form-grid">
					<label htmlFor="name">Name:</label>
					<input name="name"
						type="text"
						value={pollResp?.poll.name}
						onChange={handleFormChange} />

					<label htmlFor="description">Description:</label>
					<input name="description"
						type="text"
						value={pollResp?.poll.description}
						onChange={handleFormChange} />
				</div>

				<h4>Poll Options</h4>
				{pollOptions}
				<div style={{margin: "5% 0 2% 0", padding: "0"}}>
					<h4>Added Poll Options</h4>
					{addedPollOptions}
				</div>
				<button onClick={addPollOption}>Add Poll Option</button>
				<button type="submit">Save</button>
			</form>
		</div>
	)
}
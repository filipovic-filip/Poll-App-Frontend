import { useEffect, useState } from "react"
import { GET_POLL_PATH, POLL_OPTION_USERS_VOTED, VOTE_FOR_POLL_OPTION } from "../../const";
import './PollCard.css'
import { useNavigate, useParams } from "react-router-dom";
import ViewVoters from "./ViewVoters";
import { replaceUrlParams } from "../../utils/Utils";

export default function ViewPoll() {

	const [pollResp, setPollResp] = useState()
	const [showVoters, setShowVoters] = useState(false)
	const [voters, setVoters] = useState([])
	const [showPollOption, setShowPollOption] = useState()
	const { pollId } = useParams()

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

	async function handleOptionClick(option) {
		try{
			const response = await fetch(replaceUrlParams(POLL_OPTION_USERS_VOTED, {"id": option.id}))
			if (response.status != 200) {
				const errText = await response.text()
				alert(errText)
				return
			}

			const respJson = await response.json()
			setVoters(respJson)
			setShowPollOption(option.name)
			setShowVoters(true)
		} catch (error) {
			alert(error)
		}
	}

	function handleBackpanelClick() {
		setShowVoters(false)
		setVoters(null)
	}

	async function voteForOption(event, optionId) {
		event.stopPropagation()
		
		const body = {
			"option_id": optionId,
			"username": localStorage.getItem("username")
		}

		try{
			const response = await fetch(VOTE_FOR_POLL_OPTION, {
				method: 'POST',
				body: JSON.stringify(body)
			})
			if (response.status != 200) {
				const errText = await response.text()
				alert(errText)
				return
			}

			getPollData()
		} catch (error) {
			alert(error)
		}
	}

	const pollOptions = pollResp?.poll.edges.poll_options?.map((pollOption) => (
		<div className='poll-option-hoverable' id={pollOption.id} onClick={() => handleOptionClick(pollOption)}>
			<div className='poll-option-name'> {pollOption.name} </div>
			<div className='poll-option-votes'> {"Votes: " + (pollOption.vote_count === undefined ? 0 : pollOption.vote_count)} </div>
			<button  className={pollResp?.has_user_voted? "disabled" : null} onClick={(event) => voteForOption(event, pollOption.id)} disabled={pollResp?.has_user_voted}>Vote</button>
		</div>
	))

	return (
		<div>
			{showVoters && 
				<div>
					<div className="backpanel" onClick={handleBackpanelClick}></div>
					<ViewVoters voters={voters} pollOption={showPollOption} />
				</div>
			}
			<div className="poll-card-no-hover center-shrink">
				<h3>{ pollResp?.poll.name }</h3>
				<p className='poll-card-desc'>{ pollResp?.poll.description }</p>
				
				<div className='poll-card-body'>
					{pollOptions}
				</div>
				{ pollResp?.has_user_voted ? 
					<p style={{"fontStyle": "italic"}}>User has already voted on this poll</p> 
					: null
				}
			</div>
		</div>
	)
}
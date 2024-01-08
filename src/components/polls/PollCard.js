import { useNavigate } from 'react-router-dom'
import './PollCard.css'

export default function PollCard( {poll, modify} ) {

	const navigate = useNavigate()

	function handleClick() {
		navigate(`../poll/view/${poll.id}`)
	}

	function handleModify(event) {
		event.stopPropagation()
		navigate(`../poll/modify/${poll.id}`)
	}

	const pollOptions = poll.edges.poll_options?.map((pollOption) => (
		<div className='poll-option' id={pollOption.id}>
			<div className='poll-option-name'> {pollOption.name} </div>
			<div className='poll-option-votes'> {"Votes: " + (pollOption.vote_count === undefined ? 0 : pollOption.vote_count)} </div>
		</div>
	))

	return (
		<div className={'poll-card center-horizontal'} 
			onClick={handleClick} 
			id={poll.id}>

			<h3>{ poll.name }</h3>
			<p className='poll-card-desc'>{ poll.description }</p>
			
			<div className='poll-card-body'>
				{pollOptions}
			</div>
			{modify && <div><button onClick={handleModify}>Modify</button></div>}
		</div>
	)
}
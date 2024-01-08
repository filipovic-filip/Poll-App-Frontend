import { useState } from "react"
import "./PollCard.css"

export default function ViewVoters({ voters, pollOption }) {

	const showVoters = voters?.map((voter) => (
		<li>{voter.username}</li>
	))

	return (
		<div className="poll-card voters center front">
			<h3>{`Voted for '${pollOption}'`}</h3>
			<div className="poll-card-body">
				{showVoters}
			</div>
		</div>
	)
}
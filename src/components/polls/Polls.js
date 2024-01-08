import { useEffect, useState } from "react";
import { POLLS_PATH } from "../../const";
import PollCard from "./PollCard";

export default function Polls() {

	const [polls, setPolls] = useState([])
	
	useEffect(() => {
		fetch(POLLS_PATH)
		  .then((res) => {
			return res.json();
		  })
		  .then((data) => {
			setPolls(data);
		  });
	}, []);
	
	const pollList = polls.map((poll) => (
		<PollCard key={poll.id} poll={poll} modify={false} />
	))

	return (
		<div className="center-horizontal">
			{pollList}
		</div>
	)
}
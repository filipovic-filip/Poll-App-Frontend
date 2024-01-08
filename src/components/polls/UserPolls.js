import { useEffect, useState } from "react";
import { USER_POLLS_PATH } from "../../const";
import PollCard from "./PollCard";

export default function UserPolls() {
	const [polls, setPolls] = useState([])
	
	useEffect(() => {
		fetch(`${USER_POLLS_PATH}${localStorage.getItem("username")}`)
		  .then((res) => {
			return res.json();
		  })
		  .then((data) => {
			setPolls(data);
		  });
	}, []);
	
	const pollList = polls.map((poll) => (
		<PollCard key={poll.id} poll={poll} modify={true} />
	))

	return (
		<div className="center-horizontal">
			{pollList}
		</div>
	)
}
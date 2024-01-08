import { Link, NavLink, useNavigate } from "react-router-dom";
import './NavBar.css'
import { useState } from "react";

export default function NavBar () {

	const [, setUpdate] = useState()
	
	function handleLogout() {
		localStorage.clear("username")
		localStorage.clear("firstName")
		localStorage.clear("lastName")
		localStorage.clear("userId")
		setUpdate({})
	}
	
	return (
		<nav>
			<ul>
				{ localStorage.getItem("username") !== null ?
					<div>
						<li>
							<NavLink to="/polls">Polls</NavLink>
						</li>
						<li>
							<NavLink to="/user-polls">User Polls</NavLink>
						</li>
						<li>
							<NavLink to="/poll/create">Create Poll</NavLink>
						</li>
						<li>
							<Link to="/login" onClick={handleLogout}>Log out</Link>
						</li>
					</div>
					: null
				}

				<li>
					<NavLink to="/register">Register</NavLink>
				</li> 
				<li>
					<NavLink to="/login">Login</NavLink>
				</li>
			</ul>
		</nav>
	)
}
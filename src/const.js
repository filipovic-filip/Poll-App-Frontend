//Routing
let BACKEND_URL = "http://localhost:8080/"


let USER_PATH = BACKEND_URL + "user/"

export const LOGIN_URL = USER_PATH + "login/"
export const REGISTER_URL = USER_PATH + "register/"


export let POLLS_PATH = BACKEND_URL + "poll/"
export let USER_POLLS_PATH = POLLS_PATH + "created-by/"
export let GET_POLL_PATH = POLLS_PATH + "id/"

export const CREATE_POLL_PATH = POLLS_PATH + "create/"
export const MODIFY_POLL_PATH = POLLS_PATH + "modify/"


export let POLL_OPTIONS_PATH = BACKEND_URL + "poll-options/"
export let POLL_OPTION_USERS_VOTED = POLL_OPTIONS_PATH + ":id/users/"
export const VOTE_FOR_POLL_OPTION = POLL_OPTIONS_PATH + "vote/"
import axios from "axios"
import history from "../history"
import { setCurrentTeam } from "./currentTeam"

/**
 * ACTION TYPES
 */
const GET_ALL_TEAMS = "GET_ALL_TEAMS"
const CREATED_NEW_TEAM = "CREATED_NEW_TEAM"

/**
 * INITIAL STATE
 */
const defaultTeams = []

/**
 * ACTION CREATORS
 */
export const getAllTeams = teams => ({ type: GET_ALL_TEAMS, teams })
export const createdNewTeam = team => ({ type: CREATED_NEW_TEAM, team })

/**
 * THUNK CREATORS
 */
export const fetchTeams = () => {
  return dispatch =>
    axios
      .get(`/api/teams`)
      .then(teams => {
        dispatch(getAllTeams(teams.data))
      })
      .catch(err => console.log(err))
}

export const postNewTeam = name => dispatch => {
  return axios
    .post("/api/teams", { name })
    .then(res => res.data)
    .then(team => {
      dispatch(createdNewTeam(team))
      history.push(`/teams/${team.id}/home`)
    })
    .catch(err => console.error(err))
}

/**
 * REDUCER
 */
export default function(state = defaultTeams, action) {
  switch (action.type) {
    case GET_ALL_TEAMS:
      return action.teams
    case CREATED_NEW_TEAM:
      return [...state, action.team]
    default:
      return state
  }
}

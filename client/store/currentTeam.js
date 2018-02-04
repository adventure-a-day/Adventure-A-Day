import socket from "../socket"
import axios from "axios"
import {
  fetchTeamMessages,
  fetchAssigned,
  fetchCompleted,
  fetchTeamMembers
} from "./index"

/**
 * ACTION TYPES
 */
const SET_CHOSEN_TEAM = "SET_CHOSEN_TEAM"

/**
 * INITIAL STATE
 */
const defaultTeam = {}

/**
 * ACTION CREATORS
 */
export const setChosenTeam = team => ({ type: SET_CHOSEN_TEAM, team })

export const setCurrentTeam = teamId => dispatch => {
  axios
    .get(`/api/teams/${teamId}`)
    .then(res => res.data)
    .then(team => {
      dispatch(setChosenTeam(team))
      dispatch(fetchAssigned(teamId))
      dispatch(fetchCompleted(teamId))
      dispatch(fetchTeamMembers(teamId))
      dispatch(fetchTeamMessages(teamId))
      socket.emit("room", teamId)
    })
    .catch(err => console.error(err))
}

/**
 * REDUCER
 */
export default function(state = defaultTeam, action) {
  switch (action.type) {
    case SET_CHOSEN_TEAM:
      return action.team
    default:
      return state
  }
}

import { fetchAssigned, fetchCompleted } from "./index"

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

export const setCurrentTeam = team => dispatch => {
  dispatch(setChosenTeam(team))
  dispatch(fetchAssigned(team.id))
  dispatch(fetchCompleted(team.id))
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

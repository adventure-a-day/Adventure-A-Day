import axios from "axios"
import history from "../history"

/**
 * ACTION TYPES
 */
const GET_ALL_MISSIONS = "GET_ALL_MISSIONS"
// const DELETE_MISSION = 'DELETE_MISSION' **This will be useful later
/**
 * INITIAL STATE
 */
const defaultMissions = []

/**
 * ACTION CREATORS
 */
export const getAllMissions = missions => ({ type: GET_ALL_MISSIONS, missions })

/**
 * THUNK CREATORS
 */
export const fetchMissions = () => {
  return dispatch =>
    axios
      .get(`/api/missions/`)
      .then(missions => {
        dispatch(getAllMissions(missions.data))
      })
      .catch(err => console.log(err))
}

/**
 * REDUCER
 */
export default function(state = defaultMissions, action) {
  switch (action.type) {
    case GET_ALL_MISSIONS:
      return action.missions
    default:
      return state
  }
}

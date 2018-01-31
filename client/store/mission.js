import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_MISSION = 'GET_MISSION'
// const DELETE_MISSION = 'DELETE_MISSION' **This will be useful later
/**
 * INITIAL STATE
 */
const defaultMission ={}

/**
 * ACTION CREATORS
 */
export const getMission = mission => ({type: GET_MISSION, mission})
// const deleteMission = () => ({type: DELETE_MISSION})

/**
 * THUNK CREATORS
 */
export const fetchMission = (missionId) => {
    return dispatch => axios.get(`/api/missions/${missionId}`)
    .then(foundMission => {
        dispatch(getMission(foundMission.data))
    })
    .catch(err => console.log(err))
}


/**
 * REDUCER
 */
export default function (state = defaultMission, action) {
  switch (action.type) {
    case GET_MISSION:
      return action.mission
    default:
      return state
  }
}
import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_TEAMS = 'GET_ALL_TEAMS'

/**
 * INITIAL STATE
 */
const defaultTeams =[]

/**
 * ACTION CREATORS
 */
export const getAllTeams = teams => ({type: GET_ALL_TEAMS, teams})


/**
 * THUNK CREATORS
 */
export const fetchTeams = () => {
    return dispatch => axios.get(`/api/teams`) 
    .then(teams => {
        dispatch(getAllTeams(teams.data))
    })
    .catch(err => console.log(err))
}


/**
 * REDUCER
 */
export default function (state = defaultTeams, action) {
  switch (action.type) {
    case GET_ALL_TEAMS:
      return action.teams
    default:
      return state
  }
}
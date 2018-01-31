import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_CURRENT_TEAM = 'SET_CURRENT_TEAM'

/**
 * INITIAL STATE
 */
const defaultTeam = {}

/**
 * ACTION CREATORS
 */
export const setCurrentTeam = team => ({type: SET_CURRENT_TEAM, team})

/**
 * REDUCER
 */
export default function (state = defaultTeam, action) {
  switch (action.type) {
    case SET_CURRENT_TEAM:
      return action.team
    default:
      return state
  }
}
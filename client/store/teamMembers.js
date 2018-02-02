import axios from "axios"

/**
 * ACTION TYPES
 */
const GOT_TEAM_MEMBERS = "GOT_TEAM_MEMBERS"

/**
 * ACTION CREATORS
 */
export const gotAllTeamMembers = teamMembers => ({
  type: GOT_TEAM_MEMBERS,
  teamMembers
})

/**
 * THUNK CREATORS
 */
export const fetchTeamMembers = teamId => {
  return dispatch =>
    axios
      .get(`/api/teams/${teamId}/teamMembers`)
      .then(teamMembers => {
        dispatch(gotAllTeamMembers(teamMembers.data))
      })
      .catch(err => console.log(err))
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GOT_TEAM_MEMBERS:
      return action.teamMembers
    default:
      return state
  }
}

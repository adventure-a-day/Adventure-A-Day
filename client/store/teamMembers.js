import axios from "axios"
import { gotAddMemberMessage } from "../store"

/**
 * ACTION TYPES
 */
const GOT_TEAM_MEMBERS = "GOT_TEAM_MEMBERS"
const ADDED_TEAM_MEMBER = "ADDED_TEAM_MEMBER"

/**
 * ACTION CREATORS
 */
export const gotAllTeamMembers = teamMembers => ({
  type: GOT_TEAM_MEMBERS,
  teamMembers
})

const addedTeamMember = teamMember => ({
  type: ADDED_TEAM_MEMBER,
  teamMember
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

export const postNewTeamMember = (targetUser, teamId) => dispatch =>
  axios.post(`/api/teams/${teamId}/teamMembers`, { targetUser })
    .then(res => {
    if (typeof res.data === "string") {
      dispatch(gotAddMemberMessage(res.data))
    } else {
      dispatch(gotAddMemberMessage("Team Member Added!"))
      dispatch(addedTeamMember(res.data))
    }
    })
    .catch(err => console.error(err))

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GOT_TEAM_MEMBERS:
      return action.teamMembers
    case ADDED_TEAM_MEMBER:
      return [...state, action.teamMember]
    default:
      return state
  }
}

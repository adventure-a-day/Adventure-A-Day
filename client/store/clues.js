import axios from "axios"

/**
 * ACTION TYPES
 */
const GOT_ASSIGNED = "GOT_ASSIGNED"
const GOT_COMPLETED = "GOT_COMPLETED"
const GOT_USER_CLUES = "GOT_USER_CLUES"

/**
 * DEFAULT STATE
 */
const clueState = {
  assignedClues: [],
  completedClues: [],
  userClues: []
}

/**
 * ACTION CREATORS
 */
export const gotAssigned = assignedClues => ({
  type: GOT_ASSIGNED,
  assignedClues
})

export const gotCompleted = completedClues => ({
  type: GOT_COMPLETED,
  completedClues
})

export const gotUserClues = userClues => ({
  type: GOT_USER_CLUES,
  userClues
})

/**
 * THUNK CREATORS
 */
export const fetchAssigned = teamId => {
  return dispatch =>
    axios
      .get(`/api/clues/${teamId}/assignedClues`)
      .then(assignedClues => {
        dispatch(gotAssigned(assignedClues.data))
      })
      .catch(err => console.log(err))
}

export const fetchCompleted = teamId => {
  return dispatch =>
    axios
      .get(`/api/clues/${teamId}/completedClues`)
      .then(completedClues => {
        dispatch(gotCompleted(completedClues.data))
      })
      .catch(err => console.log(err))
}

export const fetchUserClues = () => {
  return dispatch =>
    axios
      .get("/api/clues")
      .then(userClues => {
        dispatch(gotUserClues(userClues.data))
      })
      .catch(err => console.log(err))
}

export const fetchNewAdventures = teamId => dispatch => {
  axios
    .get(`/teams/${teamId}/assign`)
    .then(res => res.data)
    .then(assignedClues => dispatch(gotAssigned(assignedClues)))
    .catch(err => console.error(err))
}
/**
 * REDUCER
 */
export default function(state = clueState, action) {
  switch (action.type) {
    case GOT_ASSIGNED:
      return Object.assign({}, state, { assignedClues: action.assignedClues })
    case GOT_COMPLETED:
      return Object.assign({}, state, { completedClues: action.completedClues })
    case GOT_USER_CLUES:
      return Object.assign({}, state, { userClues: action.userClues })
    default:
      return state
  }
}

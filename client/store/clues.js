import axios from "axios"

/**
 * ACTION TYPES
 */
const GOT_ASSIGNED = "GOT_ASSIGNED"
const GOT_COMPLETED = "GOT_COMPLETED"

/**
 * DEFAULT STATE
 */
const clueState = {
  assignedClues: [],
  completedClues: []
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

/**
 * REDUCER
 */
export default function(state = clueState, action) {
  switch (action.type) {
    case GOT_ASSIGNED:
      return Object.assign({}, state, { assignedClues: action.assignedClues })
    case GOT_COMPLETED:
      return Object.assign({}, state, { completedClues: action.completedClues })
    default:
      return state
  }
}

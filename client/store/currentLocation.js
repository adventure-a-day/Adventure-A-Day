/**
 * ACTION TYPES
 */
const SET_CURRENT_LOCATION = "SET_CURRENT_LOCATION"

/**
 * INITIAL STATE
 */
const defaultLocation = []

/**
 * ACTION CREATORS
 */
export const setCurrentLocation = coords => ({ type: SET_CURRENT_LOCATION, coords })


/**
 * REDUCER
 */
export default function(state = defaultLocation, action) {
  switch (action.type) {
    case SET_CURRENT_LOCATION:
      return action.coords
    default:
      return state
  }
}
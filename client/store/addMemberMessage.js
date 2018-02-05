/**
 * Action types
 */
const GOT_ADD_MEMBER_MESSAGE = "GOT_ADD_MEMBER_MESSAGE"

/**
 * Action Creators
 */
export const gotAddMemberMessage = message => ({
  type: GOT_ADD_MEMBER_MESSAGE,
  message
})

/**
 * SubReducer
 */
export default function(state = "", action) {
  switch (action.type) {
    case GOT_ADD_MEMBER_MESSAGE:
      return action.message
    default:
      return state
  }
}

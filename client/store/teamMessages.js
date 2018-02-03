import axios from "axios"
import socket from "../socket"

/**
 * ACTION TYPES
 */
const GOT_TEAM_MESSAGES = "GOT_TEAM_MESSAGES"
const GOT_NEW_MESSAGE = "GOT_NEW_MESSAGE"
const POSTED_MESSAGE = "POSTED_NEW_MESSAGE"

/**
 * ACTION CREATORS
 */
const gotTeamMessages = messages => ({
  type: GOT_TEAM_MESSAGES,
  messages
})

export const gotNewMessage = message => ({
  type: GOT_NEW_MESSAGE,
  message
})

const postedMessage = message => ({
  type: POSTED_MESSAGE,
  message
})

/*
 * THUNK CREATORS
 */
export const fetchTeamMessages = teamId => dispatch =>
  axios
    .get(`/api/messages/${teamId}`)
    .then(res => res.data)
    .then(messages => dispatch(gotTeamMessages(messages)))
    .catch(err => console.error(err))

export const postNewMessage = message => dispatch => {
  axios.post(`/api/messages/${message.teamId}`, message).then(() => {
    dispatch(postedMessage(message))
    socket.emit("new-message", message)
  })
}

/*
 * SUB REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GOT_TEAM_MESSAGES:
      return action.messages
    case GOT_NEW_MESSAGE:
      return [action.message, ...state]
    case POSTED_MESSAGE:
      return [action.message, ...state]
    default:
      return state
  }
}

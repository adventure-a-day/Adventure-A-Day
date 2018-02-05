const isProduction = process.env.NODE_ENV === 'production'
import { createStore, combineReducers, applyMiddleware } from "redux"
import createLogger from "redux-logger"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import user from "./user"
import mission from "./mission"
import teams from "./teams"
import currentTeam from "./currentTeam"
import clues from "./clues"
import teamMembers from "./teamMembers"
import teamMessages from "./teamMessages"
import addMemberMessage from "./addMemberMessage"
import currentLocation from './currentLocation'

const reducer = combineReducers({
  user,
  mission,
  teams,
  currentTeam,
  teamMembers,
  clues,
  teamMessages,
  addMemberMessage,
  currentLocation
})
const middleware = isProduction
  ? composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )
  : composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  )
const store = createStore(reducer, middleware)

export default store
export * from "./user"
export * from "./mission"
export * from "./teams"
export * from "./teamMembers"
export * from "./currentTeam"
export * from "./clues"
export * from "./teamMessages"
export * from "./addMemberMessage"
export * from './currentLocation'

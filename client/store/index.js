import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import mission from './mission'
import teams from './teams'
import currentTeam from './currentTeam'
import messages from './messages'

const reducer = combineReducers({user, mission, teams, currentTeam, messages})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './mission'
export * from './teams'
export * from './currentTeam'
export * from './messages'

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import axios from "axios"
import store, { getUser, fetchTeams } from "./store"
import Routes from "./routes"
import register from "./serviceWorker.js"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

register()

// establishes socket connection
import "./socket"

axios
  .get("/auth/me")
  .then(res => res.data)
  .then(user => {
    if (user) store.dispatch(fetchTeams())
    store.dispatch(getUser(user))
    ReactDOM.render(
      <Provider store={store}>
        <MuiThemeProvider theme={getMuiTheme(darkBaseTheme)}>
          <Routes />
        </MuiThemeProvider>
      </Provider>,
      document.getElementById("app")
    )
  })
  .catch(err => console.error(err))

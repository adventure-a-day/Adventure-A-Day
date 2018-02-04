import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import axios from "axios"
import store, { me, getUser, fetchTeams } from "./store"
import Routes from "./routes"
import register from "./serviceWorker.js"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme"
import getMuiTheme from "material-ui/styles/getMuiTheme"

register()

// establishes socket connection
import "./socket"

store.dispatch(me())
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("app")
)

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import axios from "axios"
import store, { getUser } from "./store"
import Routes from "./routes"
import register from "./serviceWorker.js"
register()

// establishes socket connection
import "./socket"

axios
  .get("/auth/me")
  .then(res => res.data)
  .then(user => {
    store.dispatch(getUser(user))
    ReactDOM.render(
      <Provider store={store}>
        <Routes />
      </Provider>,
      document.getElementById("app")
    )
  })
  .catch(err => console.error(err))

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "./store"
import Routes from "./routes"
import register from "./serviceWorker.js"
register()
import subscribePush from "./pushSubscribe"
subscribePush()

// establishes socket connection
import "./socket"

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("app")
)

const { subscribePush, unsubscribePush } = require("../pushSubscribe")
import React, { Component } from "react"

export default class PushBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSubscribed: false,
      supportsPush: false
    }
  }

  componentDidMount() {
    navigator.serviceWorker.ready
      .then(reg => {
        if (reg.pushManager) {
          this.setState({ supportsPush: true })
          return reg.pushManager.getSubscription()
        } else {
          throw new Error("Push Not Supported")
        }
      })
      .then(sub => {
        const isSubscribed = !!sub
        this.setState({ isSubscribed })
      })
      .catch(err => console.error(err))
  }

  render() {
    if (this.state.supportsPush) {
      return this.state.isSubscribed ? (
        <button
          id="subscribed"
          onClick={() => {
            unsubscribePush()
              .then(() => this.setState({ isSubscribed: false }))
              .catch(err => console.log("Unsubscribe Failed\n", err))
          }}
        >
          Unsubscribe
        </button>
      ) : (
        <button
          id="unsubscribed"
          onClick={() => {
            subscribePush()
              .then(() => this.setState({ isSubscribed: true }))
              .catch(err => console.log("Subscribe Failed\n", err))
          }}
        >
          Subscribe
        </button>
      )
    } else {
      return ""
    }
  }
}

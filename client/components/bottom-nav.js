import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import history from "../history"
import { withRouter, Link } from "react-router-dom"
const { subscribePush, unsubscribePush } = require("../pushSubscribe")
import fontawesome from "@fortawesome/fontawesome"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import { bell } from "@fortawesome/fontawesome-free-solid"
import { logout } from "../store"
import { PushBtn } from "./index"

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class BottomNavbar extends Component {
  constructor() {
    super()
    this.state = {
      selectedIndex: 0,
      isSubscribed: false,
      supportsPush: false
    }
  }

  componentDidMount() {
    if (navigator.serviceWorker) {
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
  }

  render() {
    const { handleClick, isLoggedIn, currentTeam } = this.props

    return (
      <div id="footerContainer">
        <footer className="footer">
          <button
            onClick={() => {
              history.push("/")
            }}
            className="navContainer"
          >
            <img src="/earth.png" id="homeIcon" />
            <div>Home</div>
          </button>

          <button onClick={handleClick} className="navContainer">
            <FontAwesomeIcon className="navIcon" icon="sign-out-alt" />
            <div>Sign Out</div>
          </button>
          {this.state.supportsPush ? (
            this.state.isSubscribed === true ? (
              <button
                className="navContainer"
                onClick={() =>
                  unsubscribePush()
                    .then(() => this.setState({ isSubscribed: false }))
                    .catch(err => console.log("Unsubscribe Failed\n", err))
                }
              >
                <FontAwesomeIcon className="navIcon" icon="bell" />
                <div>Notifications On</div>
              </button>
            ) : (
              <button
                className="navContainer"
                onClick={() =>
                  subscribePush()
                    .then(() => this.setState({ isSubscribed: true }))
                    .catch(err => console.log("Subscribe Failed\n", err))
                }
              >
                <FontAwesomeIcon className="navIcon" icon="bell-slash" />
                <div>Notifications Off</div>
              </button>
            )
          ) : (
            <div />
          )}
        </footer>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(BottomNavbar))

/**
 * PROP TYPES
 */
BottomNavbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

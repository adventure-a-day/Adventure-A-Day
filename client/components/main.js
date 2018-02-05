import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { logout } from "../store"
import { PushBtn, TeamSelect, BottomNavbar, LocationTracker } from "./index"

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */

const Main = props => {
  const { children, handleClick, isLoggedIn, teamId } = props

  Notification.requestPermission()

  return (
    <div>
      <div id="footer">
        <BottomNavbar />
      </div>
      <LocationTracker />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  //mapping "isLoggedIn" here is currently redundant, but may be useful for future purposes
  return {
    isLoggedIn: !!state.user.id,
    teamId: state.currentTeam.id || null
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired
}

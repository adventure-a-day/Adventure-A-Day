import React, { Component } from "react"
import { connect } from "react-redux"
import { Route, Switch, Router, Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import history from "./history"
import {
  Main,
  Login,
  Signup,
  UserHome,
  LocationTracker,
  PhotoInput,
  Messages,
  TeamHome,
  SolveClue,
  GalleryView,
  TestMain
} from "./components"
import { me } from "./store"

/**
 * COMPONENT
 */
const Routes = props => {
  const { isLoggedIn } = props

  return (
    <Router history={history}>
      <Main>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/" component={UserHome} />
              <Route path="/location" component={LocationTracker} />
              <Route path="/upload-image" component={PhotoInput} />
              <Route path="/messages" component={Messages} />
              <Route path="/my-team" component={TeamHome} />
              <Route path="/solve-clue" component={SolveClue} />
              <Route path="/gallery" component={GalleryView} />
              <Redirect to="/" />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      </Main>
    </Router>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => ({})

export default connect(mapState)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  //  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

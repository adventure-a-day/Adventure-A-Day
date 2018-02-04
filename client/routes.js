import React, { Component } from "react"
import { connect } from "react-redux"
import { Route, Switch, Router, Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import history from "./history"
import store, { setCurrentTeam, fetchAllTeams } from "./store"
import {
  Main,
  Login,
  Signup,
  UserHome,
  Messages,
  TeamHome,
  SolveClue,
  GalleryView,
  Team
} from "./components"

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
              <Route path="/team/:teamId/" component={Team} />
              <Route path="/team/:teamId/home" component={TeamHome} />
              <Route path="/team/:teamId/messages" component={Messages} />
              <Route path="/team/:teamId/solve-clue" component={SolveClue} />
              <Route path="/team/:teamId/gallery" component={GalleryView} />
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

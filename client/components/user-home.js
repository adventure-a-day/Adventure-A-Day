import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import CreateTeam from "./CreateTeam"

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { email } = props

  return (
    <div className="main-content">
      <h3>Welcome, {email}</h3>
      <CreateTeam />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.userName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

import React, { Component } from "react"
import { connect } from "react-redux"
import { setCurrentTeam } from "../store"

class Team extends Component {
  componentDidMount() {
    this.props.handleTeam(this.props.match.params.teamId)
  }
  render() {
    return <h1>{this.props.currentTeam.name}</h1>
  }
}

const mapState = ({ currentTeam }) => ({ currentTeam })
const mapDispatch = dispatch => ({
  handleTeam(teamId) {
    dispatch(setCurrentTeam(teamId))
  }
})

export default connect(mapState, mapDispatch)(Team)

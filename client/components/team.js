import React, { Component } from "react"
import { connect } from "react-redux"
import { setCurrentTeam } from "../store"

class Team extends Component {
  componentDidMount() {
    console.log(this.props.match.params.teamId)
    this.props.handleTeam(this.props.match.params.teamId)
  }
  render() {
    return <div />
  }
}

const mapState = () => ({})
const mapDispatch = dispatch => ({
  handleTeam(teamId) {
    dispatch(setCurrentTeam(teamId))
  }
})

export default connect(mapState, mapDispatch)(Team)

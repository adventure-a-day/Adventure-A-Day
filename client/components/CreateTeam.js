import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { postNewTeam } from "../store"

class CreateTeam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ""
    }
    this.handleCreate = this.handleCreate.bind(this)
  }

  handleCreate(evt) {
    evt.preventDefault()
    const [teamName, missionId] = [
      evt.target.teamName.value,
      evt.target.mission.value
    ]
    if (teamName && missionId !== "Select Theme...") {
      this.props.create(teamName, missionId)
      evt.target.teamName.value = ""
    } else if (!teamName) {
      this.setState({ message: "Must Have Team Name" })
    } else {
      this.setState({ message: "Must Select Theme" })
    }
  }

  render() {
    const props = this.props
    const message = this.state.message
    return (
      <form onSubmit={this.handleCreate}>
        <label>Create A Team: </label>
        <input type="text" name="teamName" placeholder="Enter team name..." />
        <select defaultValue="Select Theme..." name="mission">
          <option disabled>Select Theme...</option>
          {props.missions.map(mission => (
            <option value={mission.id} key={mission.id}>
              {mission.name}
            </option>
          ))}
        </select>
        <button>Create</button>
        <small>
          <br />
          {message}
        </small>
      </form>
    )
  }
}

const mapState = ({ missions }) => ({ missions })
const mapDispatch = dispatch => ({
  create(teamName, missionId) {
    dispatch(postNewTeam(teamName, missionId))
  }
})

export default withRouter(connect(mapState, mapDispatch)(CreateTeam))

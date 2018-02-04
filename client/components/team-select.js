//this is where the user can pick from a list of their associated teams
//this component needs to include a links to each single team page, and set
//that team id as the "currentTeam" on state

import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { setCurrentTeam } from "../store"

const Teams = props => {
  const { teams, setChosenTeam } = props
  return (
    <select
      value={props.currentTeam.id || "Select Team..."}
      onChange={setChosenTeam}
    >
      <option disabled>Select Team...</option>
      {teams &&
        teams.map(team => {
          return (
            <option value={team.id} key={team.id}>
              {team.name}
            </option>
          )
        })}
    </select>
  )
}

const mapState = ({ teams, currentTeam }) => {
  return {
    teams: teams,
    currentTeam
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    setChosenTeam(event) {
      event.preventDefault()
      const teamId = event.target.value
      ownProps.history.push(`/team/${teamId}/home`)
      // dispatch(setCurrentTeam(teamId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Teams))

//this is where the user can pick from a list of their associated teams
//this component needs to include a links to each single team page, and set
//that team id as the "currentTeam" on state

import React from "react"
import { connect } from "react-redux"
import { setCurrentTeam } from "../store"

const Teams = props => {
  const { teams, setChosenTeam } = props
  return (
    <select defaultValue="Select Team..." onChange={setChosenTeam}>
      <option disabled>Select Team...</option>
      {teams &&
        teams.map(team => {
          return (
            <option value={JSON.stringify(team)} key={team.id}>
              {team.name}
            </option>
          )
        })}
    </select>
  )
}

const mapState = ({ teams }) => {
  return {
    teams: teams
  }
}

const mapDispatch = dispatch => {
  return {
    setChosenTeam(event) {
      event.preventDefault()
      const team = JSON.parse(event.target.value)
      dispatch(setCurrentTeam(team))
    }
  }
}

export default connect(mapState, mapDispatch)(Teams)

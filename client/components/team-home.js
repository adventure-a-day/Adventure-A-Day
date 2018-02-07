import React, { Component } from "react"
import { connect } from "react-redux"

import { withRouter, Link } from "react-router-dom"
import AddTeamMember from "./AddTeamMember"
import NewAdventures from "./NewAdventures"

const TeamHome = props => {
  const { clues, teamMembers, user, currentTeam } = props
  let userClue
  return (
    <div>
      <AddTeamMember />
      <NewAdventures />

      { user && clues.assignedClues && (

        ((clues.assignedClues.filter(clue => clue.userId === user.id)).length > 0) && (
          <Link to={`/team/${currentTeam.id}/solve-clue`}><button>Complete Current Adventure</button></Link>
        )


        )


      }

      <h1>Team Adventures</h1>
      <ul>
        {clues.assignedClues &&
          clues.assignedClues.map(clue => {
            let user
            if (teamMembers.length) {
              user = teamMembers.filter(member => member.id === clue.userId)[0]
            }
            return (
              <li key={clue.clue.id}>
                {user && user.userName}: {clue.clue.prompt}
              </li>
            )
          })}
      </ul>
      <h1>Completed Adventures</h1>
      <ul>
        {clues.completedClues &&
          clues.completedClues.map(clue => {
            let user
            if (teamMembers.length) {
              user = teamMembers.filter(member => member.id === clue.userId)[0]
            }
            return (
              <li key={clue.clue.id}>
                {user && user.userName}: {clue.clue.prompt}
              </li>
            )
          })}
      </ul>
    </div>
  )
}

const mapState = ({ clues, teamMembers, user, currentTeam }) => ({ clues, teamMembers, user, currentTeam })

const mapDispatch = (dispatch, ownProps) => ({})

export default withRouter(connect(mapState, mapDispatch)(TeamHome))

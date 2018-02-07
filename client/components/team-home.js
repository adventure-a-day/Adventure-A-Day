import React, { Component } from "react"
import { connect } from "react-redux"

import { withRouter } from "react-router-dom"
import AddTeamMember from "./AddTeamMember"
import NewAdventures from "./NewAdventures"


const TeamHome = props => {
  const { clues, teamMembers } = props
  return (
    <div>
      <AddTeamMember />
      <NewAdventures />
      <h1>Team Adventures</h1>
      <div className="card-container">
        {clues.assignedClues &&
          clues.assignedClues.map(clue => {
            let user
            if (teamMembers.length) {
              user = teamMembers.filter(member => member.id === clue.userId)[0]
            }
            return (
              <div key={clue.clue.id} className="card" id={clue.clue.id}>
                <div className="side">{user && user.userName}</div>
                <div className="side back">{clue.clue.prompt}</div>
              </div>
            )
          })}
      </div>
      <h1>Completed Adventures</h1>
      <div className="card-container">
        {clues.completedClues &&
          clues.completedClues.map(clue => {
            let user
            if (teamMembers.length) {
              user = teamMembers.filter(member => member.id === clue.userId)[0]
            }
            return (
              <div key={clue.clue.id} className="card" id={clue.clue.id}>
                <div className="side">{user && user.userName}</div>
                <div className="side back">{clue.clue.prompt}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

const mapState = ({ clues, teamMembers }) => ({ clues, teamMembers })

const mapDispatch = (dispatch, ownProps) => ({})

export default withRouter(connect(mapState, mapDispatch)(TeamHome))

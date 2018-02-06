import React, { Component } from "react"
import { connect } from "react-redux"

import { withRouter, BrowserRouter as Router } from "react-router-dom"
import AddTeamMember from "./AddTeamMember"

const TeamHome = props => {
  const {clues, teamMembers} = props;
  return (
    <div>
    <AddTeamMember />
    <h1>Team Adventures</h1>
    <ul>
      {clues.assignedClues &&
        clues.assignedClues.map(clue => (
          <li key={clue.clue.id}>{teamMembers.length && teamMembers.filter(member => member.id === clue.userId)[0].userName}: {clue.clue.prompt}</li>
        ))}
    </ul>
    <h1>Completed Adventures</h1>
    <ul>
      {clues.completedClues &&
        clues.completedClues.map(clue => (
          <li key={clue.clue.id}>{clue.clue.prompt}</li>
        ))}
    </ul>
  </div>
  )
}


const mapState = ({ clues, teamMembers }) => ({ clues, teamMembers })

const mapDispatch = (dispatch, ownProps) => ({})

export default withRouter(connect(mapState, mapDispatch)(TeamHome))

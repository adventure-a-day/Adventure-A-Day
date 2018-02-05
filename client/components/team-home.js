import React, { Component } from "react"
import { connect } from "react-redux"

import { withRouter, BrowserRouter as Router } from "react-router-dom"
import AddTeamMember from "./AddTeamMember"

const TeamHome = props => (
  <div>
    <AddTeamMember />
    <h1>Assigned Tasks</h1>
    <ul>
      {props.clues.assignedClues &&
        props.clues.assignedClues.map(clue => (
          <li key={clue.clue.id}>{clue.clue.prompt}</li>
        ))}
    </ul>
    <h1>Completed Tasks</h1>
    <ul>
      {props.clues.completedClues &&
        props.clues.completedClues.map(clue => (
          <li key={clue.clue.id}>{clue.clue.prompt}</li>
        ))}
    </ul>
  </div>
)

const mapState = ({ clues }) => ({ clues })

const mapDispatch = (dispatch, ownProps) => ({})

export default withRouter(connect(mapState, mapDispatch)(TeamHome))

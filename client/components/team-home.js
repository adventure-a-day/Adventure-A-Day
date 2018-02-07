import React, { Component } from "react"
import { connect } from "react-redux"

import { withRouter, Link } from "react-router-dom"
import AddTeamMember from "./AddTeamMember"
import NewAdventures from "./NewAdventures"


const TeamHome = props => {
  const { clues, teamMembers, user, currentTeam } = props

  return (
    <div>
      <AddTeamMember />
      <h1>Team Adventures</h1>
      <div className="card-container">

        { clues.assignedClues.length > 0 ?
            clues.assignedClues.map(clue => {
              let member
              if (teamMembers.length) {
                member = teamMembers.filter(member => member.id === clue.userId)[0]
              }
              return (
                <div key={clue.clue.id} className="card" id={clue.clue.id}>
                  <div className="side">{member && member.userName}</div>
                  <div className="side back">
                    <div>{clue.clue.prompt}
                    <br/>
                    {user.id === clue.userId && clues.assignedClues && (
                      <Link to={`/team/${currentTeam.id}/solve-clue`}><button>Upload Photo</button></Link>
                    )}
                    </div>
                  </div>
                </div>
              )
            })
          : <NewAdventures />}
      
      </div>
      <h1>Completed Adventures</h1>
      <div className="card-container">
        {clues.completedClues &&
          clues.completedClues.map(clue => {
            let member
            if (teamMembers.length) {
              member = teamMembers.filter(member => member.id === clue.userId)[0]
            }
            return (
              <div key={clue.clue.id} className="card" id={clue.clue.id}>
                <div className="side">{member && member.userName}</div>
                <div className="side back">{clue.clue.prompt}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

const mapState = ({ clues, teamMembers, user, currentTeam }) => ({ clues, teamMembers, user, currentTeam })

const mapDispatch = (dispatch, ownProps) => ({})

export default withRouter(connect(mapState, mapDispatch)(TeamHome))

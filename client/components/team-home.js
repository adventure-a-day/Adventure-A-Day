import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter, BrowserRouter as Router } from "react-router-dom"
import { fetchMission, setCurrentTeam } from "../store"

const TeamHome = props => (
  <div>
    <h1>{this.props.mission && this.props.mission.name}</h1>
    {this.props.mission.clues &&
      this.props.mission.clues.map(clue => {
        return <div key={clue.id}>{clue.prompt}</div>
      })}
  </div>
)

const mapState = ({ clues }) => ({ clues })

const mapDispatch = (dispatch, ownProps) => ({})

export default withRouter(connect(mapState, mapDispatch)(TeamHome))

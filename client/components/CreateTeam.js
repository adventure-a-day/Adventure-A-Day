import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { postNewTeam } from "../store"

const CreateTeam = props => (
  <form onSubmit={props.handleCreate}>
    <label>Create A Team: </label>
    <input type="text" name="teamName" placeholder="Enter team name..." />
    <button>Create</button>
  </form>
)

const mapState = () => ({})
const mapDispatch = dispatch => ({
  handleCreate(evt) {
    evt.preventDefault()
    dispatch(postNewTeam(evt.target.teamName.value))
    evt.target.teamName.value = ""
  }
})

export default withRouter(connect(mapState, mapDispatch)(CreateTeam))

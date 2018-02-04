import React, { Component } from "react"
import { connect } from "react-redux"
import { postNewTeam } from "../store"

const CreateTeam = props => (
  <form onSubmit={props.handleCreate}>
    <input type="text" name="teamName" />
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

export default connect(mapState, mapDispatch)(CreateTeam)

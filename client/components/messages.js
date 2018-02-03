import React, { Component } from "react"
import { postNewMessage } from "../store"
import { connect } from "react-redux"

//this needs to load messages from the db
const Messages = props => {
  const { teamMessages, teamMembers, currentTeam, user, handleSubmit } = props

  return (
    <div className="main-content">
      <form onSubmit={evt => handleSubmit(evt, currentTeam.id, user.id)}>
        <input name="text" type="text" placeholder="Chat Away!" />
        <button type="submit" className="btn-success">
          Submit
        </button>
      </form>
      {teamMessages.map(message => {
        const teamMember = teamMembers.find(
          foundUser => foundUser.id === message.userId
        )
        return (
          <div key={message.id}>
            <img src={teamMember.photo} />
            <h4>{teamMember.userName}</h4>
            <p>{message}</p>
          </div>
        )
      })}
    </div>
  )
}

const mapState = ({ teamMembers, teamMessages, currentTeam, user }) => ({
  teamMembers,
  teamMessages,
  currentTeam,
  user
})

const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit(evt, teamId, userId) {
    const text = evt.target.text.value
    const message = { text, teamId, userId }
    dispatch(postNewMessage(message))
  }
})
export default connect(mapState, mapDispatch)(Messages)

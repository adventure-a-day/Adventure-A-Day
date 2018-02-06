import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { postNewTeamMember } from "../store"

const AddTeamMember = props => (
  <form onSubmit={props.handleSubmit}>
    <label>Add A Team Member: </label>
    <input type="text" name="targetUser" placeholder="Enter username or email..." />
    <div>{props.addMemberMessage}</div>
    <button>Submit</button>
  </form>
)

const mapState = ({ addMemberMessage }) => ({ addMemberMessage })
const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit(evt) {
    evt.preventDefault()
    const targetUser = evt.target.targetUser.value
    const { teamId } = ownProps.match.params
    dispatch(postNewTeamMember(targetUser, teamId))
    evt.target.targetUser.value = ""
  }
})

export default withRouter(connect(mapState, mapDispatch)(AddTeamMember))

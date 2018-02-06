import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { postNewTeamMember } from "../store"

const AddTeamMember = props => (
  <div id="add-member-container">
  <form onSubmit={props.handleSubmit} >
  <div id="add-member-sub-container">
      <div>Add A Team Member: </div>
      <input type="text" name="targetUser" id="add-member-input" placeholder="Enter username or email..." />
      <div>{props.addMemberMessage}</div>
      <button id="add-member-submit">Submit</button>
    </div>
  </form>
  </div>
)

const mapState = ({ addMemberMessage }) => ({ addMemberMessage })
const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit(evt) {
    const targetUser = evt.target.targetUser.value
    const { teamId } = ownProps.match.params
    dispatch(postNewTeamMember(targetUser, teamId))
    evt.target.targetUser.value = ""
  }
})

export default withRouter(connect(mapState, mapDispatch)(AddTeamMember))

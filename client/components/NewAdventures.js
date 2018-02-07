import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { fetchNewAdventures } from "../store"

const NewAdventures = props => {
  const { handleClick } = props
  return (
    <div>
      <h2>Looks like your team has adventures left!</h2>
      <p>Would you like to send out new ones?</p>
      <button onClick={handleClick}>New Adventures!</button>
    </div>
  )
}

const mapState = () => ({})
const mapDispatch = (dispatch, ownProps) => ({
  handleClick(evt) {
    evt.preventDefault()
    dispatch(fetchNewAdventures(ownProps.match.params.teamId))
  }
})

export default withRouter(connect(mapState, mapDispatch)(NewAdventures))

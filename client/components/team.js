import React, { Component } from "react"
import { connect } from "react-redux"
import { setCurrentTeam } from "../store"
import history from "../history"
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { home, images, comments  } from '@fortawesome/fontawesome-free-solid'



class Team extends Component {
  componentDidMount() {
    this.props.handleTeam(this.props.match.params.teamId)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", event => {
        console.log("Client Received Message: " + event.data)
        this.props.handleTeam(this.props.match.params.teamId)
      })
    }
  }
  render() {
    const { currentTeam } = this.props
    return (
      <div id="teamNavbarContainer">
      <h2>{currentTeam.name}</h2>
        <div id="teamNavbar">
          <div className="teamMenuContainer" id="teamHome" onClick={() => history.push(`/team/${currentTeam.id}/home`)}>
            <FontAwesomeIcon icon="home"/>
            <div>Team Home</div>
          </div>
          <div className="teamMenuContainer" id="teamMenu" onClick={() => history.push(`/team/${currentTeam.id}/gallery`)}>
            <FontAwesomeIcon icon="images"/>
            <div>Gallery</div>
          </div>
          <div className="teamMenuContainer" id="teamMssg" onClick={() => history.push(`/team/${currentTeam.id}/messages`)}>
            <FontAwesomeIcon icon="comments"/>
            <div>Chat</div>
          </div>
         
        </div>
       
      </div>
    )
  }
}

const mapState = ({ currentTeam }) => ({ currentTeam })
const mapDispatch = dispatch => ({
  handleTeam(teamId) {
    dispatch(setCurrentTeam(teamId))
  }
})

export default connect(mapState, mapDispatch)(Team)

/**
 *  <IconButton
            id="left"
            onClick={() => history.push(`/team/${currentTeam.id}/home`)}
          >
            <FontIcon className="material-icons">keyboard_arrow_left</FontIcon>
          </IconButton>
          <IconMenu
            iconButtonElement={
              <IconButton id="right">
                <MoreVertIcon />
              </IconButton>
            }
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
            targetOrigin={{ horizontal: "left", vertical: "top" }}
          >
            <MenuItem
              primaryText="Team Home"
              onClick={() => history.push(`/team/${currentTeam.id}/home`)}
            />
            <MenuItem
              primaryText="Messages"
              onClick={() => history.push(`/team/${currentTeam.id}/messages`)}
            />
            <MenuItem
              primaryText="Gallery"
              onClick={() => history.push(`/team/${currentTeam.id}/gallery`)}
            />
          </IconMenu>
 */
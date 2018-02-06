import React, { Component } from "react"
import { connect } from "react-redux"
import { setCurrentTeam } from "../store"
// import AppBar from 'material-ui/AppBar';
import history from '../history'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FontIcon from 'material-ui/FontIcon'

class Team extends Component {
  componentDidMount(props) {
    this.props.handleTeam(this.props.match.params.teamId)
  }
  render(props) {
    const {currentTeam} = this.props
    return(
      <div>
        <IconButton onClick={() => history.push(`/team/${currentTeam.id}/home`)}>
          <FontIcon className="material-icons" >keyboard_arrow_left</FontIcon>
        </IconButton>
        <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      > 
        <MenuItem primaryText="Team Home" onClick={() => history.push(`/team/${currentTeam.id}/home`)}/>
        <MenuItem primaryText="Messages" onClick={() => history.push(`/team/${currentTeam.id}/messages`)}/>
        <MenuItem primaryText="Gallery" onClick={() => history.push(`/team/${currentTeam.id}/gallery`)}/>
      </IconMenu>
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

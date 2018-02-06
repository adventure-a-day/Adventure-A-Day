import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {Link} from 'react-router-dom'
import CreateTeam from "./CreateTeam"
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card"
import FlatButton from "material-ui/FlatButton"
import Avatar from "material-ui/Avatar"
import { MapView} from "../components"
import { fetchUserClues } from "../store"


/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(props) {
    this.props.fetchClueData()
  }

  render(props) {
    const { userName, clues, photo, teams } = this.props
    let currentClue = {}

    // console.log("Clues: ", clues)
    return (
      <div>
        <h1>Adventure A Day</h1>
        <div id="user-header">
          <span>
            <Avatar src={photo} />
          </span>
          <div> 
            <h3>Adventure Awaits... {userName}</h3>
            <CreateTeam />
          </div>
        </div>
        { teams.length ? ( teams.map(team => {
            currentClue = clues.userClues.find(clue => (clue.teamId === team.id && clue.status === "assigned"))
            return (
              <Card key={team.id}>
                {
                  !!currentClue ? (
                    <CardHeader
                      title={`${team.name}`}
                      subtitle={`${currentClue.clue.prompt}`}
                    />
                  )
                  : (
                    <CardHeader title={`${team.name}`} />
                )}
                <CardActions>
                  <Link to={`/team/${team.id}/home`}><FlatButton label="View Team" /></Link>
                  {
                    clues.userClues.length && (
                      clues.userClues.map(clue => {
                        return (
                          <Link to={`/team/${clue.teamId}/solve-clue`} key={clue.id}><FlatButton label="Current Adventure" /></Link>
                        )
                      })
                    )
                  }
                </CardActions>
                <CardText expandable={true}>
                </CardText>
              </Card>
            )
          })
        ) : (
          <div>Sign up with a team to start your adventures!</div>
        )}
      </div>
    )
  }
}

/*

{clues.userClues.length ? (
  clues.userClues.map(clue => {
    return (
      <Card key={clue.id}>
        <CardHeader
          title={`${clue.clue.prompt}`}
          
        />
        <CardActions>
          <Link to={`/team/${clue.teamId}/solve-clue`}><FlatButton label="Solve" /></Link>
          <Link to={`/team/${clue.teamId}/home`}><FlatButton label="Team Page" /></Link>
        </CardActions>
        <CardText expandable={true}>
        </CardText>
      </Card>
    )
  })
) : (
  <div>Sign up with a team to start your adventures!</div>
)}

*/


/**
 * CONTAINER
 */
const mapState = ({ user, clues, teams }) => {
  return {
    userName: user.userName,
    photo: user.photo,
    teams: teams,
    clues: clues
  }
}


const mapDispatch = dispatch => {
  return {
    fetchClueData() {
      dispatch(fetchUserClues())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}


/**
 * actAsExpander={true}
                  showExpandableButton={true}
 */
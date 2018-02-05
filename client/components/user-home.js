import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import CreateTeam from "./CreateTeam"
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card"
import FlatButton from "material-ui/FlatButton"
import Avatar from "material-ui/Avatar"
import { MapView } from "../components"
import { fetchUserClues } from "../store"

// const assignedClues = [
//   { prompt: "a doodle cartoon you drew", status: "not completed" },
//   { prompt: "some local artwork you found", status: "not completed" }
// ]

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(props) {
    // this.props.teams && this.props.teams.forEach(team => {
    //   console.log("TEAM: ", team.id)
    //   fetchClueData(team.id)
    // }
    this.props.fetchClueData()
    console.log("IN COMPONENT DID MOUNT")
  }

  render(props) {
    const { userName, clues, photo, teams } = this.props
    console.log("PROPS: ", this.props)
    // clues && clues.map(clue => console.log(clue))
    return (
      <div>
        <div>
          <h3>Welcome, {userName}</h3>
          <span>
            <Avatar src={photo} />
          </span>
          <CreateTeam />
        </div>
        {clues.userClues.length ? (
          clues.userClues.map(clue => {
            console.log("CLUE: ", clue)
            return (
              <Card>
                <CardHeader
                  title={`${clue.clue.prompt}`}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardActions>
                  <FlatButton label="Solve" />
                  <FlatButton label="Team Page" />
                </CardActions>
                <CardText expandable={true}>
                  <MapView />
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
  clue status:
    subtitle={clue.status}

          <div>
          <h3>Welcome, {userName}</h3>
          <span>
            <Avatar src={photo} />
          </span>
          <CreateTeam />
        </div>
        {clues.length ? (
          clues.map(clue => {
            return (
              <Card>
                <CardHeader
                  title={`${clue.prompt}`}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardActions>
                  <FlatButton label="Solve" />
                  <FlatButton label="Team Page" />
                </CardActions>
                <CardText expandable={true}>
                  <MapView />
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

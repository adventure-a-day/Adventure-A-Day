import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

const assignedClues = [
  {prompt: 'a doodle cartoon you drew', status: 'not completed'},
  {prompt: 'some local artwork you found', status: 'not completed'}
]

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {userName, clues, photo} = props
  console.log('clues ', clues)
  return (
    <div>
      <div>
        <h3>Welcome, {userName}</h3>  
        <span><Avatar src={photo} /></span>
      </div>
      {assignedClues.length ? 
        assignedClues.map(clue => {
          return (
            <Card>
              <CardHeader
                title={`Take a picture of... ${clue.prompt}`}
                subtitle={clue.status}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardActions>
                <FlatButton label="Solve" />
                <FlatButton label="Team Page" />
              </CardActions>
              <CardText expandable={true}>
                {clues.prompt}
              </CardText>
            </Card>
          )}) : 
        <div>Sign up with a team to start your adventures!</div>
      }
      
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = ({user, clues}) => {
  return {
    userName: user.userName,
    photo: user.photo,
    clues: clues
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

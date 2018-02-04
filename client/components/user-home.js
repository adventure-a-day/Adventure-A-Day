import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div className="main-content">
      <h3>Welcome, {email}</h3>
      <Card>
      <CardHeader
        title="Without Avatar"
        subtitle="Subtitle"
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardActions>
        <FlatButton label="Action1" />
        <FlatButton label="Action2" />
      </CardActions>
      <CardText expandable={true}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
    </Card>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.userName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

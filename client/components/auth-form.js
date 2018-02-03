import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {TextField, RaisedButton} from 'material-ui'

const styles = theme => ({
  container: {
    display: 'center',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
})

/**
 * COMPONENT
 */
class AuthForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  render(props) {
    const {name, displayName, error, handleSubmit} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit.bind(this)} name={name} className="form-group">
        <TextField 
          id="username"
          className="input"
          margin="normal"
          type="text"
          floatingLabelText="username"
          value={this.state.name}
          onChange={(e, input) => this.setState({username: input})}
        /><br />
        <TextField 
          id="email"
          className="input"
          margin="normal"
          type="text"
          floatingLabelText="email"
          value={this.state.email}
          onChange={(e, input) => this.setState({email: input})}
        /><br />
        <TextField 
          id="password"
          className="input"
          margin="normal"
          type="password"
          floatingLabelText="password"
          value={this.state.password}
          onChange={(e, input) => this.setState({password: input})}
        /><br />
        <div>
          <RaisedButton style={{margin: 12}} label={displayName} type="submit"/>
        </div>
        </form>
      </div>
     )
  }

}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      console.log(this.state, 'state in dispatch')
      const formName = evt.target.name
      const email = this.state.email
      const password = this.state.password
      const userName = this.state.userName
      dispatch(auth(email, password, userName, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}


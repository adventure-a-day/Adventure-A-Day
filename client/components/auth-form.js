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
 * 
 */

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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render(props) {
    const {name, displayName, handleSubmit, error} = this.props

    return (
      <div>
        <form onSubmit={handleSubmit} name={name} className="form-group">
        <TextField 
          id="username"
          margin="normal"
          type="text"
          floatingLabelText="username"
          value={this.state.name}
          onChange={(e, input) => this.setState({username: input})}
        /><br />
        <TextField 
          id="email"
          margin="normal"
          type="text"
          floatingLabelText="email"
        /><br />
        <TextField 
          id="password"
          margin="normal"
          type="text"
          floatingLabelText="password"
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
      console.log(evt.target.name, 'evt.target.name')
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const userName = evt.target.userName.value
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

/**
 *       
 */

 /**
  * <div className="main-content">
        <form onSubmit={handleSubmit} name={name} className="form-group" >
          <div>
            <label htmlFor="email"><small>Email</small></label>
            <input name="email" type="text" className="input-control"/>
          </div>
          <div>
            <label htmlFor="userName"><small>Display name</small></label>
            <input name="userName" type="text" className="input-control"/>
          </div>
          <div>
            <label htmlFor="password"><small>Password</small></label>
            <input name="password" type="password" className="input-control" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google <img id="google-icon" src="google-icon.jpg"/></a>
      </div> 
  */
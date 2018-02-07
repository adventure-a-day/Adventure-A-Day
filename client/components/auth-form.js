import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { auth } from "../store"
import { TextField, RaisedButton } from "material-ui"

const styles = theme => ({
  container: {
    display: "center",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

/**
 * COMPONENT
 */
class AuthForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: "",
      email: "",
      password: "",
      password2: "",
      message: ""
    }
  }

  render(props) {
    const { name, displayName, error, handleSubmit } = this.props
    const emailInput = name === "signup" ? "email" : "email or username"
    const { message } = this.state
    return (
      <div>
        <form
          onSubmit={handleSubmit.bind(this)}
          name={name}
          className="form-group"
        >
          {name === "signup" && (
            <div>
              <TextField
                id="username"
                className="input"
                margin="normal"
                type="text"
                floatingLabelText="username"
                value={this.state.userName}
                onChange={(e, input) => this.setState({ userName: input })}
              />
              <br />
            </div>
          )}
          <TextField
            id="email"
            className="input"
            margin="normal"
            type="text"
            floatingLabelText={emailInput}
            value={this.state.email}
            onChange={(e, input) => this.setState({ email: input })}
          />
          <br />
          <TextField
            id="password"
            className="input"
            margin="normal"
            type="password"
            floatingLabelText="password"
            value={this.state.password}
            onChange={(e, input) => this.setState({ password: input })}
          />
          <br />
          {name === "signup" && (
            <div>
              <TextField
                id="password2"
                className="input"
                margin="normal"
                type="password"
                floatingLabelText="re-enter password"
                value={this.state.password2}
                onChange={(e, input) => this.setState({ password2: input })}
              />
              <br />
            </div>
          )}
          <div>{message}</div>
          <div>
            <RaisedButton
              style={{ margin: 12 }}
              label={displayName}
              type="submit"
            />
            or{" "}
            {name === "login" ? (
              <Link to="/signup">Sign Up</Link>
            ) : (
              <Link to="login">Log In</Link>
            )}
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
const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = this.state.email
      const password = this.state.password
      const password2 = this.state.password2
      const userName = this.state.userName
      console.log(userName)
      if (formName === "login" || password === password2) {
        dispatch(auth(email, password, userName, formName))
      } else {
        this.setState({ message: "Passwords Do Not Match" })
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
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

import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { logout } from "../store"
import { PushBtn, TeamSelect, BottomNavbar } from "./index"
// import LoginHeader from './login-header'
// import MainHeader from './main-header'


/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */


const Main = props => {
  const { children, handleClick, isLoggedIn } = props

  Notification.requestPermission()

  return (
    <div>
      
      <div id="footer">
        <BottomNavbar />
      </div>       
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired
}

/**
 *  <div className="heading-container">
      <img src='wwiw-text.png' className="header-text"/>
        <img src='earth.png' className="header-icon"/>
      </div>
 */

 /**{isLoggedIn ? <MainHeader/> : <LoginHeader /> } */

 /**
  *  <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */
  //           <div><Link to="/home">Home</Link></div>
  //           <div><a href="#" onClick={handleClick}>
  //             Logout
  //           </a></div>
  //           <Link to="/location">Geolocation</Link>
  //           <Link to="/upload-image">Upload Image</Link>
  //           <Link to="/messages"> Messages </Link>
  //           <Link to="/my-team">My Team </Link>
  //           <TeamSelect />
  //           <PushBtn />
  //         </div>
  //       ) : (
  //         <div className="footer-items">
  //           {/* The navbar will show these links before you log in */}
  //           <Link to="/login">Login</Link>
  //           <Link to="/signup">Sign Up</Link>
  //         </div>
  //       )}
  //     </nav>
  // */
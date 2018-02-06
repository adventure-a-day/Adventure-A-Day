import React, {Component} from 'react';
import PropTypes from "prop-types"
import { connect } from 'react-redux';
import history from '../history'
import { withRouter, Link } from "react-router-dom"
const { subscribePush, unsubscribePush } = require("../pushSubscribe")
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import {red500, greenA200} from 'material-ui/styles/colors';
import {logout } from '../store';
import {PushBtn} from './index';

const homeIcon =  <i className="material-icons">home</i>

const iconStyles = {
    marginRight: 24,
};
const settingsIcon = <FontIcon className="material-icons">settings</FontIcon>;
const nearbyIcon = <IconLocationOn />;
const notificationsOn = <FontIcon className="material-icons">notifications_active</FontIcon>;
const notificationsOff = <FontIcon className="material-icons">notifications_off</FontIcon>;
const exitIcon = <FontIcon className="material-icons">exit_to_app</FontIcon>;
const accountIcon = <FontIcon className="material-icons">account_box</FontIcon>;
//^^ I'm having syntax errors trying to insert this to prompt the user to log in
/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class BottomNavbar extends Component {
  constructor() {
    super()   
    this.state = {
        selectedIndex: 0,
        isSubscribed: false,
        supportsPush: false
        }
      };

  componentDidMount() {
    if (navigator.serviceWorker) {navigator.serviceWorker.ready
        .then(reg => {
          if (reg.pushManager) {
            this.setState({ supportsPush: true })
            return reg.pushManager.getSubscription()
          } else {
            throw new Error("Push Not Supported")
          }
        })
        .then(sub => {
          const isSubscribed = !!sub
          this.setState({ isSubscribed })
        })
        .catch(err => console.error(err))}
  }



  render() {
    const {handleClick, isLoggedIn} = this.props

    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            icon={homeIcon}
            onClick={() => history.push('/')}
          />
          <BottomNavigationItem
            icon={exitIcon}
            onClick={() => handleClick()}
          />
          {this.state.supportsPush ?
            this.state.isSubscribed === true ?  
                <BottomNavigationItem icon={notificationsOn}
                  onClick={() => unsubscribePush()
                    .then(() => this.setState({ isSubscribed: false }))
                    .catch(err => console.log("Unsubscribe Failed\n", err))
                }
                /> 
            :
            <BottomNavigationItem
            icon={notificationsOff}
            onClick={() => subscribePush()
              .then(() => this.setState({ isSubscribed: true }))
              .catch(err => console.log("Subscribe Failed\n", err))}
            />
          :
              <div></div>
          }
         
        </BottomNavigation>
      </Paper>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}



// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(BottomNavbar))

/**
 * PROP TYPES
 */
BottomNavbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

/**
 *  <BottomNavigationItem
            label="Find me"
            icon={nearbyIcon}
            onClick={() => this.select(2)}
          />
 */

 /**
  * <BottomNavigationItem
            icon={settingsIcon}
            onClick={}
          />
  */
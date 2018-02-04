import React, {Component} from 'react';
import { connect } from 'react-redux'
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import {red500, greenA200} from 'material-ui/styles/colors';


const homeIcon =  <i class="material-icons">home</i>

const iconStyles = {
    marginRight: 24,
};
const settingsIcon = <FontIcon className="material-icons">settings</FontIcon>;
const nearbyIcon = <IconLocationOn />;
const notificationsOn = <FontIcon className="material-icons">notifications_active</FontIcon>;
const notificationsOff = <FontIcon className="material-icons">notifications_off</FontIcon>;
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
        notifications: true
      };
  }

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            icon={homeIcon}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            icon={settingsIcon}
            onClick={() => this.select(1)}
          />
          {this.state.notifications === true ?  
            <BottomNavigationItem
            icon={notificationsOn}
            onClick={() => this.setState({notifications: false})}
            /> 
            :
            <BottomNavigationItem
            icon={notificationsOff}
            onClick={() => this.setState({notifications: true})}
            />
          }
          
         
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomNavbar;

/**
 *  <BottomNavigationItem
            label="Find me"
            icon={nearbyIcon}
            onClick={() => this.select(2)}
          />
 */
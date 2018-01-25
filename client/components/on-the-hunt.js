import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export class LocationTracker extends Component {
    constructor() {
        super() 
            this.state = {
                currentLocation: {}
            }
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              console.log("current position: lat " + pos.lat + ", long " + pos.lng)
              this.setState({currentLocation: pos})
            })
        }
    }
   
    render() {
        return (
            <div>
              <h3>You are currently at: {this.state.currentLocation.lat && this.state.currentLocation.lat} degrees latitude and {this.state.currentLocation.lng && this.state.currentLocation.lng} degrees longitude</h3>
            </div>
          )
    }
 
}




/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     currentLocation: state.user.currentLocation
//   }
// }

// export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   latitude: PropTypes.string,
//   longitude: PropTypes.string
// }
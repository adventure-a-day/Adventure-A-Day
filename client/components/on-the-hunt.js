import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

/**
 * COMPONENT
 */
export class LocationTracker extends Component {
    constructor() {
        super() 
            this.state = {
                currentLocation: []
            }
    }

      componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              this.setState({ currentLocation: [pos.lat, pos.lng] })
            })
        }
      }
   
    render() {
        return (
            <div className="main-content">
              <h3>You are currently at: {this.state.currentLocation[0] && this.state.currentLocation[0]} degrees latitude and {this.state.currentLocation[1] && this.state.currentLocation[1]} degrees longitude</h3>
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

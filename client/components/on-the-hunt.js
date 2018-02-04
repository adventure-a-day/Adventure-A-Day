import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
// let geocoder = new google.maps.Geocoder;
// let infowindow = new google.maps.InfoWindow;
import {setCurrentLocation} from '../store'
/**
 * COMPONENT
 */
export class LocationTracker extends Component {
    constructor(props) {
        super(props) 
    }

    componentDidMount(props) {
      console.log(this.props, 'updated props in component did mount2')
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              this.props.setCurrentLocation([pos.lat, pos.lng])
            })
          }
      }
   
    render() {
        return (
            <div id="map">
             
            </div>
          )
    }
}

const mapState = ({user}) => {user}

const mapDispatch = (dispatch) => {
  return {
    setCurrentLocation(coords) {
      console.log('setting currentLocation to ' + coords)
      dispatch(setCurrentLocation(coords))
    }
  }
}

export default connect(mapState, mapDispatch)(LocationTracker)

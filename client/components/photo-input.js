import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export class PhotoInput extends Component {
    constructor() {
        super() 
        this.state = {
            photoURL: ''
        }
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
      const fileList = event.target.files
      //console.log(event.target.files)

      let file = null;

      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].type.match(/^image\//)) {
          file = fileList[i];
          break;
        }
      }

      if (file !== null) {
        //output.src = URL.createObjectURL(file);
        console.log(URL.createObjectURL(file))
      }

    }
   
    render() {
        return (
            <div>
              <input type="file" accept="image/*" id="file-input" onChange={this.handleChange}></input>
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
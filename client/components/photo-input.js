import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import config from './config'
let AWS = require('aws-sdk')

/**
 * COMPONENT
 */
export class PhotoInput extends Component {
    constructor() {
        super() 
        this.state = {
            blob: {},
            data: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
      const file = event.target.files[0]

      if (file !== null) {

        let reader = new FileReader()
        reader.onloadend = () => {
          this.setState({
            blob: file,
            data: reader.result
          })

          let s3 = new AWS.S3()

          let bucketName = 'where-in-the-world-gh'
          let keyName = file.name
          let body = file

          s3.config.credentials = config

          let params = {Bucket: bucketName, Key: keyName, Body: body}
          s3.putObject(params, function(err, data) {
            if(err) {
              console.log("ERROR: ", err)
            }
            else {
              console.log('Successfully uploaded photo to AWS!')
            }
          })

        }

        reader.readAsDataURL(file)
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
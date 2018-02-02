import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom"
import config from './config'
let AWS = require('aws-sdk')

/**
 * COMPONENT
 */
export class PhotoInput extends Component {
    constructor() {
        super() 
        this.state = {
            photoURL: '',
            message: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
      event.preventDefault()
      const file = event.target.file.files[0]

      if (file !== null) {

        let reader = new FileReader()
        reader.onloadend = () => {

          let s3 = new AWS.S3()

          let bucketName = 'where-in-the-world-gh'
          let keyName = file.name
          let body = file

          let url = "https://s3.amazonaws.com/where-in-the-world-gh/" + file.name
          this.setState({
            photoURL: url
          })

          // s3.config.credentials = config

          // let params = {Bucket: bucketName, Key: keyName, Body: body}
          // s3.putObject(params, function(err, data) {
          //   if(err) {
          //     console.log("ERROR: ", err)
          //   }
          //   else {
          //     console.log('Successfully uploaded photo to AWS!')
          //   }
          // })

        }

        reader.readAsDataURL(file)
      }

      axios
        .post(`/api/clues/${teamId}/verifyClue`)
        .then(res => {
          this.setState({
            message: res.data
          })
        })
        .catch(err => console.log(err))

    }
   
    render() {
        return (
            <div>
              <form onSubmit={this.handleSubmit}>
              <input type="file" accept="image/*" id="file-input" name="file"></input>
              <button type="submit">Submit</button>
              </form>
              <h4>{this.state.photoURL}</h4>
              <h4>{this.state.message}</h4>
            </div>
          )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    photoURL: state.user.photoURL
  }
}

const mapDispatch = (dispatch, ownProps) => ({
//   handleSubmit
})

export default withRouter(connect(mapState, mapDispatch)(PhotoInput))

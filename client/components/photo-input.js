import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom"
import config from './config'
import axios from "axios"
let AWS = require('aws-sdk')

/**
 * COMPONENT
 */
export class PhotoInput extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            imageUrl: '',
            currentTeam: this.props.currentTeam,
            message: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event, teamId) {
      // event.preventDefault()
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
            imageUrl: url
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

      console.log("TEAM: ", teamId)
      // axios
      //   .post(`/api/clues/${teamId}/verifyClue`, {imageUrl})
      //   .then(res => {
      //     history.push("/upload-image")
      //     this.setState({
      //       message: res.data
      //     })
      //   })
      //   .catch(err => console.log(err))

    }
   
    render() {
        return (
            <div className="main-content">
              <form onSubmit={evt => this.handleSubmit(evt, this.props.currentTeam.id)}>
              <input type="file" accept="image/*" id="file-input" name="file"></input>
              <button type="submit">Submit</button>
              </form>
              <h4>{this.state.imageUrl}</h4>
              <h4>{this.state.message}</h4>
              <h4>{this.props.currentTeam}</h4>
            </div>
          )
    }
}



/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    photoURL: state.imageUrl,
    currentTeam: state.currentTeam,
    message: state.message
  }
}

const mapDispatch = (dispatch) => ({
//   handleSubmit
})

export default withRouter(connect(mapState, mapDispatch)(PhotoInput))

import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import config from "./config"
import axios from "axios"
import { fetchAssigned, fetchCompleted } from '../store'
let AWS = require("aws-sdk")

/**
 * COMPONENT
 */
class PhotoInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: "",
      message: "",
      success: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event, teamId, userId) {
    event.preventDefault()
    const file = event.target.file.files[0]
    let imageUrl

    if (file !== null) {
      let reader = new FileReader()
      reader.onloadend = () => {
        let s3 = new AWS.S3()

        let bucketName = "where-in-the-world-gh"
        let keyName = file.name
        let body = file

        let photoName = file.name.split(" ").join("+")
        imageUrl = "https://s3.amazonaws.com/where-in-the-world-gh/" + photoName
        this.setState({ imageUrl })

        s3.config.credentials = config

        let params = { Bucket: bucketName, Key: keyName, Body: body }
        s3.putObject(params, err => {
          if (err) {
            console.log("ERROR: ", err)
          } else {
            console.log("Successfully uploaded photo to AWS!")
          }
        })

        // verify photo using Google Cloud Vision
        let message
        axios
          .post(`/api/clues/${teamId}/verifyClue`, { imageUrl })
          .then(res => {
            message = res.data.message
            this.setState({
              message: res.data.message,
              success: res.data.success
            })

            // add photo to database
            axios
              .post(`/api/photos/${teamId}`, {
                url: imageUrl,
                success: this.state.success,
                teamId: teamId,
                userId: userId
              })
              .then(res => {
                console.log(res.data)
                //this.props.fetchAllClues()
                if (message === "Good job! Go to the gallery to view your team's photos.") {
                  this.props.fetchAllClues()
                  this.props.history.push(`/team/${teamId}/home`)
                }
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))

      }

      reader.readAsDataURL(file)
    }

  }

  render() {
    return (
      <div>
        <form
          onSubmit={evt =>
            this.handleSubmit(
              evt,
              this.props.currentTeam.id,
              this.props.user.id
            )
          }
        >
          <input type="file" accept="image/*" id="file-input" name="file" />
          <button type="submit" id="upload-photo">
            Submit
          </button>
        </form>{" "}
        {this.state.imageUrl.length > 0 && (
          <div>
            <h4>{this.state.message}</h4>
            <img src={this.state.imageUrl} height="300" width="300" />
          </div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({ currentTeam, user }) => ({
  currentTeam,
  user
})

const mapDispatch = (dispatch, ownProps) => ({
  fetchAllClues() {
    dispatch(fetchCompleted(ownProps.match.params.teamId))
    dispatch(fetchAssigned(ownProps.match.params.teamId))
  }
})

export default withRouter(connect(mapState, mapDispatch)(PhotoInput))

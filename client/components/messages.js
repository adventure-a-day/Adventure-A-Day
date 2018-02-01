import React, { Component } from 'react'
import { connect } from 'react-redux'
import socket from '../socket'
import { withRouter, Link } from 'react-router-dom'
import { addNewMessageThunk } from '../store'


//this needs to load messages from the db
class Messages extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(props) {
        this.props.setCurrentTeam()
    }
    render(props) {
        return (
            <div>
                <h1>Team Message Board</h1>
                <form onSubmit={event => props.handleSubmit(event, props.currentUser.id, props.currentTeam.id)}>
                    <div>
                        <label htmlFor="message">
                            <small>Chat away!</small>
                        </label>
                        <input name="message" type="text" />
                    </div>

                    <button type="submit" className="btn-success">
                        Submit
    </button>
                </form>
                <div>
                    {props.messages.map(message => {
                        return (
                            <p key={message.id}>
                                <p>{message.userId}: {message.text}</p>
                            </p>
                        )
                    })
                    }

                </div>
            </div>
        )
    }
}

const mapState = function (state) {
    console.log(state, "STATE!!!!")
    return {
        messages: state.messages,
        currentUser: state.user,
        currentTeam: state.currentTeam,
        teams: state.teams
    }
}

const mapDispatch = function (dispatch, ownProps) {
    return {
        handleSubmit(event, userId, teamId) {
            event.preventDefault()
            const newMessage = {
                text: event.target.message.value,
                userId,
                teamId
            }
            console.log(newMessage, "NEW MESSAGE")

            socket.emit(newMessage)
            // socket.emit('new-message', this.state.newMessage)
            // this.setState({messages: [...this.state.messages, this.state.newMessage]})
            // this.setState({newMessage: ""})
            dispatch(addNewMessageThunk(newMessage))
        },
        setCurrentTeam(){
            console.log(this.state.teams, "TEAMS!!!!")
            const teamId = ownProps.match.params.teamId
            //dispatch(setCurrentTeam(teamId))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Messages))





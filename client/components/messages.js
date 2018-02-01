import React, { Component } from 'react'
import { connect } from 'react-redux'
import socket from '../socket'
import { withRouter, Link } from 'react-router-dom'
import { addNewMessageThunk } from '../store'


//this needs to load messages from the db
function Messages(props) {
    console.log(props, "PROPS!!!!")
    return (
        <div>
            <h1>Team Message Board</h1>
            <form onSubmit={event => props.handleSubmit(event, props.currentUser.id)}>
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

const mapState = function (state) {
    return {
        messages: state.messages,
        currentUser: state.user
    }
}

const mapDispatch = function(dispatch){
    return {
                handleSubmit(event, userId){
                    event.preventDefault()
                    //console.log(this.state.user, "USER!!!")
                    console.log(event.target, "HEYYYY")
                    const newMessage = {
                        text: event.target.message.value,
                        userId
                    }
                    console.log(newMessage, "NEW MESSAGE")
    
                    //socket.emit(newMessage)
                   // socket.emit('new-message', this.state.newMessage)
                    // this.setState({messages: [...this.state.messages, this.state.newMessage]})
                    // this.setState({newMessage: ""})
                    dispatch(addNewMessageThunk(newMessage))
                }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Messages))





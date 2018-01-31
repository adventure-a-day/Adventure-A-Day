import React, { Component } from 'react'
import { connect } from 'react-redux'
import socket from '../socket'

//this needs to load messages from the db
export class Messages extends Component {
    constructor() {
        super()
        this.state = {
            messages: [],
            newMessage: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        let message = event.target.value
        this.setState({newMessage: message})
    }

    handleSubmit(event){
        event.preventDefault()
        socket.emit('new-message', this.state.newMessage)
        this.setState({messages: [...this.state.messages, this.state.newMessage]})
        this.setState({newMessage: ""})
    }

    render() {
        return (

            <div>
                <ul>
                    {
                        this.state.messages.map(message => <p key={Math.floor(Math.random() * 100)}>{message}</p>)
                    }
                </ul>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="message">
                            <small>Chat away!</small>
                        </label>
                        <input name="message" type="text" onChange={this.handleChange} value={this.state.newMessage}/>
                    </div>

                    <button type="submit" className="btn-success">
                        Submit
            </button>
                </form>

            </div>
        )
    }
}
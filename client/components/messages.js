import React, { Component } from 'react'
import { connect } from 'react-redux'

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
        console.log(message, "MESSAGE!!!")
        this.setState({newMessage: message})
        console.log(this.state.newMessage, "SUPPPP")
    }

    handleSubmit(event){
        event.preventDefault()
        console.log(this.state.newMessage, "HEYYYYYYYYYYYY")
        this.setState({messages: [...this.state.messages, this.state.newMessage]})
        this.setState({newMessage: ""})
    }

    componentDidMount() {
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
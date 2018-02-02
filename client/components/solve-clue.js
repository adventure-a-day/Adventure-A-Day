import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import history from '../history'
import { PhotoInput } from './photo-input'

class SolveClue extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hintCounter: 0,
            isClicked: false
        }

        this.handleClick = this.handleClick.bind(this)

    }
    handleClick(event) {
        event.preventDefault()
     console.log(this.props.clues, "CLUES IN HANDLECLICK")

    }

    render(props) {
        const { clues, user } = this.props
        const assignedClue = clues.assignedClues.length && clues.assignedClues.filter(clue => clue.userId === user.id)[0]
        const hints = assignedClue && [assignedClue.clue.hint1, assignedClue.clue.hint2]
        console.log(hints, "HINTS")

        return (
            <div>
                <h1>Solve the Clue!</h1>
                {assignedClue ?
                    (<div>
                        <h1>Current Clue: </h1>
                        <h3> {assignedClue.clue.prompt}</h3>
                        <div>
                            <PhotoInput />
                        </div>
                        <div>
                            <button onClick={this.handleClick}>Give me a hint!</button>
                            <div>
                                {
                                    (this.state.isClicked &&
                                        (this.state.currentCounter === 1) ? <div>{hints[0]}</div> : <div>{hints[1]}</div>

                                    )
                                }

                            </div>
                        </div>
                    </div>
                    )
                    : <h2>Please remember to select a team</h2>
                }
            </div>
        )
    }
}

const mapState = ({ clues, user }) => {
    return {
        clues: clues,
        user: user
    }
}



export default connect(mapState, null)(SolveClue)


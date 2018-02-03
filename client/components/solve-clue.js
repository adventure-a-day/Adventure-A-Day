import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import history from '../history'
import { PhotoInput } from './index'

class SolveClue extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hints: [],
            assignedClue: {}
        }

        this.handleClick = this.handleClick.bind(this)

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.clues.assignedClues !== nextProps.clues.assignedClues) {
            const assignedClue = nextProps.clues.assignedClues && nextProps.clues.assignedClues.filter(clue => clue.userId === nextProps.user.id)[0]
            this.setState({ assignedClue: assignedClue })
        }
    }

    handleClick(event) {
        event.preventDefault()
        if (this.state.hints.length === 0) {
            this.setState({ hints: [this.state.assignedClue.clue.hint1] })
        } else {
            this.setState({ hints: [this.state.assignedClue.clue.hint1, this.state.assignedClue.clue.hint2] })
        }
    }


    render(props) {
        const { assignedClue } = this.state
        console.log(assignedClue, "ASSIGNED CLUEEEE")
        return (
            <div>
                <h1>Solve the Clue!</h1>
                {assignedClue && assignedClue.id ?
                    (<div>
                        <h1>Current Clue: </h1>
                        <h3> {assignedClue.clue && assignedClue.clue.prompt}</h3>
                        <div>
                            <PhotoInput />
                        </div>
                        <div>
                            <button onClick={this.handleClick}>Give me a hint!</button>
                        </div>
                        {this.state.hints && this.state.hints.map(hint => <div key={hint}>{hint}</div>)}

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


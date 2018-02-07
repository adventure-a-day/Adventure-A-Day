import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import history from '../history'
import { PhotoInput } from './index'

const SolveClue = props => {
    const { user, clues } = props
    let assignedClue = clues.assignedClues && clues.assignedClues.filter(clue => clue.userId === user.id)[0]

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
                    </div>
                    )
                    : <h2>Please remember to select a team</h2>
                }
            </div>
        )
}

const mapState = ({ clues, user }) => {
    return {
        clues: clues,
        user: user
    }
}



export default connect(mapState, null)(SolveClue)


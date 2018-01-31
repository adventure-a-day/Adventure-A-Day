import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, BrowserRouter as Router } from 'react-router-dom'
import { fetchMission, setCurrentTeam } from '../store'

class TeamClues extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(props) {
        this.props.getMissionData()
    }

    render(props) {
        return (
            <div>   
                <h1>{this.props.mission && this.props.mission.name}</h1>
                {this.props.mission.clues && this.props.mission.clues.map(clue => {
                    return <div key={clue.id}>{clue.prompt}</div>
                })}


            </div>
        ) 
    }
    
}

const mapState = ({mission, teams}) => {
    return {
        mission: mission
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        getMissionData() {
            const teamId = ownProps.match.params.teamId
            dispatch(fetchMission(teamId))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(TeamClues))
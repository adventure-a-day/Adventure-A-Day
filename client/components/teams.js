//this is where the user can pick from a list of their associated teams
//this component needs to include a links to each single team page, and set
//that team id as the "currentTeam" on state 

import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { setCurrentTeam } from '../store'
import history from '../history'

const Teams = (props) => {
    const {teams, setChosenTeam} = props;
        return (
            <div>   
            <h1>HIIII</h1>
            {teams && teams.map(team => {
                return <div key={team.id}><Link to={`/teams/${team.id}`} onClick={(e) => {setChosenTeam(e, team)}}>{team.name}</Link></div>
            })}
        </div>
    ) 
}

const mapState = ({teams}) => {
    return {
        teams: teams
    }
}

const mapDispatch= (dispatch) => {
    return {
        setChosenTeam(event, team) {
            event.preventDefault()
            dispatch(setCurrentTeam(team))
            history.push(`/teams/${team.id}`)
        }
    }
}


export default withRouter(connect(mapState, mapDispatch)(Teams))
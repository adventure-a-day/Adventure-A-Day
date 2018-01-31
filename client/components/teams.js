//this is where the user can pick from a list of their associated teams
//this component needs to include a links to each single team page, and set
//that team id as the "currentTeam" on state 

import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'


const Teams = (props) => {
    const {teams} = props;
        return (
            <div>   
               
            {teams && teams.map(team => {
                return <Link to={`/teams/${team.id}`} key={team.id}>{team.name}</Link>
            })}
        </div>
    ) 
}

const mapState = ({teams}) => {
    return {
        teams: teams
    }
}

// const mapDispatch= (dispatch) => {

// }


export default withRouter(connect(mapState)(Teams))
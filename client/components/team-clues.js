import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { fetchMission } from '../store'

class TeamClues extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(props) {
        console.log('props in component did mount', this.props)
        this.props.getAllClues()
    }

    render(props) {
        console.log(this.props, '!!!!!!!!!!!!!!')
        return (
            <h1>TESTING CLUES COMPONENT</h1>
        ) 
    }
    
}

const mapState = ({mission}) => {
    return {
        mission: mission
    }
}

const mapDispatch = (dispatch) => {
    return {
        getAllClues() {
            dispatch(fetchMission(1))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(TeamClues))
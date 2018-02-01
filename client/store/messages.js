import axios from 'axios'
import history from '../history'

const allMessages = []

const GET_MESSAGES = 'GET_MESSAGES'
const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'

export const getMessages = messages => ({type: GET_MESSAGES, messages})
export const addNewMessage = message => ({type: ADD_NEW_MESSAGE, message})

export const fetchAllMessages = () => dispatch => {
    axios
    .get('/api/messages/1')
    .then(res => dispatch(getMessages(res.data)))
    .catch(err => console.log(err))
}

export const addNewMessageThunk = (message) => dispatch => {
    axios
    .post('/api/messages/1', message)
    .then(res => dispatch(addNewMessage(res.data)))
}

export default function(state = allMessages, action){
    switch(action.type){
        case GET_MESSAGES:
            return [...allMessages, ...action.messages]
        case ADD_NEW_MESSAGE:
            return [...state, action.message]
        default: 
            return state
    }
}

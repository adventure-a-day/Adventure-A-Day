import axios from "axios"

/**
 * ACTION TYPES
 */
const GET_PHOTOS = "GET_PHOTOS"

/**
 * DEFAULT STATE
 */
const photoState = {
  photos: []
}

/**
 * ACTION CREATORS
 */
export const getPhotos = photos => ({
  type: GET_PHOTOS,
  photos
})

/**
 * THUNK CREATORS
 */
export const fetchPhotos = teamId => {
  return dispatch =>
    axios
      .get(`/api/photos/${teamId}`)
      .then(photos => {
        dispatch(getPhotos(photos.data))
      })
      .catch(err => console.log(err))
}

/**
 * REDUCER
 */
export default function(state = photoState, action) {
  switch (action.type) {
    case GET_PHOTOS:
      return Object.assign({}, state, { photos: action.photos })
    default:
      return state
  }
}
import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const UPDATE_NOTES = 'UPDATE_NOTES'

/**
 * INITIAL STATE
 */
const defaultState = {}

/**
 * ACTION CREATORS
 */
export const updateNotes = notes => ({type: UPDATE_NOTES, notes})

/**
 * THUNK CREATORS
 */
export const noteRec = (levelId) =>
  dispatch =>
    axios.get(`/api/levels/${levelId}`)
      .then(res =>
        dispatch(updateNotes(res.data.notes ? res.data.notes.split("") : defaultState)))
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case UPDATE_NOTES:
      return action.notes
    default:
      return state
  }
}




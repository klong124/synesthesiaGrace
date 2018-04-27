import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import _ from 'lodash'
import {noteRec, updateNotes} from "../store";
import store from "../store"

/**
 * COMPONENT
 */
class Level extends React.Component
{
  componentDidMount()
  {
    this.props.loadLevel()
    addEventListener("keypress", e =>
    {
      e.preventDefault()
      const {notes} = this.props;
      console.log("Note has been pressed")

      if (e.key.toUpperCase() !== notes[0])
        console.log("You lost :(")
      else
      {
        if (notes.length === 1)
          console.log("You won!")
        else
          this.props.update(notes.slice(1))
      }
    })
  }

  render()
  {
    const {notes} = this.props;
    const map =
      {
        "A": "red",
        "S": "orange",
        "D": "yellow",
        "F": "green",
        "J": "blue",
        "K": "indigo",
        "L": "violet"
      }
    console.log("notes are", notes)
    return ( //Rerenders every time key is pressed :(
      <div className = "notes">
        {
          _.uniq(notes).map(note =>
          {
            return (
              <svg className = {"note " + map[note]} key = {note}>
                <rect width = "100" height = "100"/>
              </svg>
            )
          })
        }
      </div>
    )
  }

}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    notes: state.notes
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadLevel () {
      dispatch(noteRec(ownProps.match.params.levelId))
    },
    update (notes) {
      dispatch(updateNotes(notes))
    }
  }
}

export default connect(mapState, mapDispatch)(Level)
//
// /**
//  * PROP TYPES
//  */
// Home.propTypes = {
//   notes: PropTypes.string
// }

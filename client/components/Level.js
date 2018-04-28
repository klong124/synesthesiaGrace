import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import _ from 'lodash'
import {noteRec, updateNotes} from '../store'
import Tone from 'tone'

/**
 * COMPONENT
 */
class Level extends React.Component
{
  componentDidMount()
  {
    this.props.loadLevel()
    console.log("notes upon mount are", this.props.notes)
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
    const keyToClassName =
      {
        "R": "red",
        "O": "orange",
        "Y": "yellow",
        "G": "green",
        "B": "blue",
        "I": "indigo",
        "V": "violet"
      }
    return ( //Rerenders every time key is pressed, but now it's not a bug, it's a feature ;)
      <div className = "notes">
        {
          _.uniq(notes).sort(function(a, b){return 0.5 - Math.random()}).map(note =>
          {
            return (
              <svg className = {"note " + keyToClassName[note]} key = {note}>
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
  const colorToSound =
    {
      "R": "G4",
      "O": "A4",
      "Y": "B#4",
      "G": "C5",
      "B": "D5",
      "I": "E5",
      "V": "F5"
    }
  return {
    loadLevel () {
      dispatch(noteRec(ownProps.match.params.levelId)).then((action) =>
      {
        const synth = new Tone.Synth().toMaster()
        action.notes.forEach((note, time) =>
        {
          synth.triggerAttackRelease(colorToSound[note], '8n', time)
        })
      })
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

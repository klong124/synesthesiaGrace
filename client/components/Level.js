import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {noteRec, updateNotes} from '../store'
import Tone from 'tone'
const synth = new Tone.Synth().toMaster()
import Won from './Won'
import Lost from './Lost'
let won, lost
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

/**
 * COMPONENT
 */
class Level extends React.Component
{
  componentDidMount()
  {
    this.props.loadLevel()
    console.log("notes upon mount are", this.props.notes)
    won, lost = false //Player hasn't won or lost at mount
    addEventListener("keypress", e =>
    {
      e.preventDefault()
      const {notes} = this.props;

      //Play note whenever key is pressed
      synth.triggerAttackRelease(colorToSound[e.key.toUpperCase()], '8n')

      if (e.key.toUpperCase() !== notes[0])
        lost = true
      else
      {
        if (notes.length === 0)
          won = true
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
    if (!won && !lost)
    {
      console.log("Goes in here")
      return ( //Rerenders every time key is pressed, but now it's not a bug, it's a feature ;)
        <div className="notes">
          {
            _.uniq(notes).sort(function (a, b)
            {
              return 0.5 - Math.random()
            }).map(note =>
            {
              return (
                <svg className={"note " + keyToClassName[note]} key={note}>
                  <rect width="100" height="100"/>
                </svg>
              )
            })
          }
        </div>
      )
    }
    if (won)
    {
      console.log("WON")
      return (
        <Won/>
      )
    }
    if (lost)
    {
      console.log("LOST")
      return (
        <Lost/>
      )
    }
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
      dispatch(noteRec(ownProps.match.params.levelId)).then((action) =>
      {
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

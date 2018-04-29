import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {noteRec, updateNotes} from '../store'
import Tone from 'tone'
import history from '../history'
const synth = new Tone.Synth().toMaster()
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
    addEventListener("keypress", e => //So we have a few different issues here
                                          //componentDidMount isn't rerunning when history.pushing (could there be an issue with not using connect in Route.js?)
                                          //when loading level again after history.pushing, the new level doesn't play its sound
                                          //when history.pushing, sound of last note of current level gets cut off <--with window.location.reload(false), this is the only issue left
                                        //With line 47, all issues get taken care of
    {
      e.preventDefault()
      const {notes} = this.props;

      //Play note whenever key is pressed
      synth.triggerAttackRelease(colorToSound[e.key.toUpperCase()], '8n')

      if (e.key.toUpperCase() !== notes[0])
        history.push('/')
      else
      {
        if (notes.length === 1)
        {
          history.push(`/levels/${+this.props.match.params.levelId + 1}`)
          setTimeout(() => window.location.reload(false), 700); //Should I do this?
        }
        else
          this.props.update(notes.slice(1))
      }
    })
  }

  render()
  {
    const {notes} = this.props
    const levelId = this.props.match.params.levelId
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
    const showKey =
      {

      }
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
        {
          (levelId === '1' || levelId === '2' || levelId === '3' || levelId === '9' || levelId === '16' || levelId === '18' || levelId === '20' || levelId === '23') &&
          <div className="key">
            <h1>Press</h1>
            {
              _.uniq(notes).map(note =>
              {
                return (
                  <h1>{note} for {keyToClassName[note].slice(0, 1).toUpperCase() + keyToClassName[note].slice(1)}</h1>
                )
              })
            }
          </div>
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
  let levelId = ownProps.match.params.levelId
  return {
    loadLevel () {
      dispatch(noteRec(levelId)).then((action) =>
      {
        action.notes.forEach((note, time) =>
        {
          synth.triggerAttackRelease(colorToSound[note], '8n', time*.7)
        })
      })
    },
    update (notes) {
      dispatch(updateNotes(notes))
    }

  }
}

export default connect(mapState, mapDispatch)(Level)

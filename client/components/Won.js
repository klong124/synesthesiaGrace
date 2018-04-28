import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class Level extends React.Component
{
  render()
  {
    return ( //Rerenders every time key is pressed, but now it's not a bug, it's a feature ;)
      <div>
        You're a winner
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

export default connect(mapState)(Level)

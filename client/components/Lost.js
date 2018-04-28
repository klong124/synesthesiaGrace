import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class Level extends React.Component
{
  render()
  {
    return (
      <div>
        You're a losey lose mcLoser-son
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

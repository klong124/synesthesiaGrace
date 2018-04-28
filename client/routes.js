import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Level, Home} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route exact path='/levels/:levelId' component={Level} />
        <Redirect to="/levels/1"/>
      </Switch>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      // dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, mapDispatch)(Routes))

// /**
//  * PROP TYPES
//  */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }

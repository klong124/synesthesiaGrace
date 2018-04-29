import React, {Component} from 'react'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Level, Home} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/levels/:levelId' component={Level} />
        <Redirect to="/levels/1"/>
      </Switch>
    )
  }
}

export default withRouter(Routes)

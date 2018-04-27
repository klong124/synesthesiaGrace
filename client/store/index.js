import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import notes from './notes'

const reducer = combineReducers({notes})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './notes'

// addEventListener("keypress", e => {
//   store.dispatch({type: "KEY_PRESS", key: e.key})
// })

requestAnimationFrame(timeStamp => {
  store.dispatch({type: "TICK", timeStamp})
})

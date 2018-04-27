/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {noteRec} from './notes' //Having some problem with this import statement
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {levels: {}}
  const levelId = 1

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('levels', () => {
    it('eventually dispatches the GET NOTES action', () => {
      const fakeLevel = {id: levelId, notes: 'ALALA'}
      mockAxios.onGet(`/api/levels/${levelId}`).replyOnce(200, fakeLevel)
      return store.dispatch(noteRec(levelId))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('UPDATE_NOTES')
          expect(actions[0].notes).to.be.deep.equal(fakeLevel.notes.split(""))
        })
    })
  })

})

/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Levels = db.model('levels')

describe('Level model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('somethingthathasnotbeencreatedyet', () => {
      let levelOne
      const notes = 'ALALA'

      beforeEach(() => {
        return Levels.create({
          notes: notes
        })
          .then(level => {
            levelOne = level
          })
      })

      // it('returns true if the password is correct', () => {
      //   expect(cody.correctPassword('bones')).to.be.equal(true)
      // })
      //
      // it('returns false if the password is incorrect', () => {
      //   expect(cody.correctPassword('bonez')).to.be.equal(false)
      // })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')

/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Levels = db.model('levels')

describe('Level routes', () =>
{
  beforeEach(() =>
  {
    return db.sync({force: true})
  })

  describe('/api/levels/:levelId', () =>
  {

    const notes = 'ALALA'
    const levelId = 1

    beforeEach(() =>
    {
      return Levels.create({
        notes: notes
      })
    })

    it('GET /api/levels/:levelId', () =>
    {
      return request(app)
        .get(`/api/levels/${levelId}`)
        .expect(200)
        .then(res =>
        {
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.be.equal(1)
          expect(res.body.notes).to.be.equal(notes)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

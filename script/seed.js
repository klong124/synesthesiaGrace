const db = require('../server/db')
const {Level} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  //The notes here are related to the letter on the key that the user must click
  const users = await Promise.all([
    Level.create({notes: 'R'}),
    Level.create({notes: 'V'}),
    Level.create({notes: 'RV'}),
    Level.create({notes: 'VR'}),
    Level.create({notes: 'VRV'}),
    Level.create({notes: 'RVR'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })


console.log('seeding...')

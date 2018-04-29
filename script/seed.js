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
    Level.create({notes: 'RVR'}),
    Level.create({notes: 'RRVVRRVV'}),
    Level.create({notes: 'RVRVRVRV'}),
    Level.create({notes: 'ROR'}),
    Level.create({notes: 'VOR'}),
    Level.create({notes: 'VVOOVV'}),
    Level.create({notes: 'ORROR'}),
    Level.create({notes: 'VOROV'}),
    Level.create({notes: 'OVOVOVR'}),
    Level.create({notes: 'ROV'}),
    Level.create({notes: 'RIOV'}),
    Level.create({notes: 'IIII'}),
    Level.create({notes: 'G'}),
    Level.create({notes: 'GIV'}),
    Level.create({notes: 'RYRYRYRY'}),
    Level.create({notes: 'YIYIYIOO'}),
    Level.create({notes: 'VOIV'}),
    Level.create({notes: 'BIBI'}),
    Level.create({notes: 'IBV'}),
    Level.create({notes: 'RVI'}),
    Level.create({notes: 'RVRBB'}),
    Level.create({notes: 'IV'}),
    Level.create({notes: 'RYR'}),
    Level.create({notes: 'OIOV'}),
    Level.create({notes: 'VOIVYYBB'}),
    Level.create({notes: 'RVVIBYO'}),
    Level.create({notes: 'OBYIROG'}),
    Level.create({notes: 'IGR'}),
    Level.create({notes: 'VORI'}),
    Level.create({notes: 'OIOIG'}),
    Level.create({notes: 'RGRI'}),
    Level.create({notes: 'IOVIG'}),
    Level.create({notes: 'IOVOIOYGVIYGB'}),
    Level.create({notes: 'BIOGVGRRR'}),
    Level.create({notes: 'RIOIOIOVOGBIG'}),
    Level.create({notes: 'GIO'}),
    Level.create({notes: 'RIO'}),
    Level.create({notes: 'RGO'}),
    Level.create({notes: 'RRI'})
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

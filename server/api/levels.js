const router = require('express').Router()
const {Level} = require('../db/models')
module.exports = router

// router.get('/', (req, res, next) => {
//   Level.findAll()
//     .then(levels => res.json(levels))
//     .catch(next)
// })

router.get('/:levelId', (req, res, next) => {
  Level.findOne({
    where: {
      id: req.params.levelId
    }
  }).then(level => res.json(level))
})

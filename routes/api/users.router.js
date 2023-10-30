const { Router } = require('express')

const isAuthenticated = require ("../../middlewares/isAuthenticated.js")

const {
  create,
  changeUserRole
} = require ("../../controllers/user.controller.js")





const router = Router()

router.post('/', create)
router.put('/premium/:uid', isAuthenticated, changeUserRole);

module.exports = router

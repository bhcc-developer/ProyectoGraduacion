const { Router } = require('express')
const router = Router()
const { signin, signup } = require('../controllers/user.controller')

router.post('/user/signin', signin )
router.post('/user/signup', signup )




module.exports = router
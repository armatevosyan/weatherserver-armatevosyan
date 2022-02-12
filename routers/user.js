const router = require('express').Router();
const passport = require('passport');
const {register, login, find} = require('../handlers/user');
const auth = require('../middleware/authMiddleWere')

router.post('/register',register)
router.post('/login', login)
router.get('/find/:id',auth, find)

module.exports = router

const router = require('express').Router();
const {creteCity, findAll, removeCity} = require('../handlers/city');
const auth = require('../middleware/authMiddleWere')

router.post('/create',auth, creteCity)
router.get('/get/:id',auth, findAll)
router.delete('/delete/:id',auth, removeCity)

module.exports = router

const router = require('express').Router()
// Import controller:
const User = require('../controllers/userController')
//  Authentication middelware :
const authMw = require('../middlewares/authMiddleware'); /* i protect the whole user route,without login i cant access user rout , */

const { isLogged ,isAdmin, isLoggedOrisAdmin } = require('../middlewares/permissions');

router.route('/')
    .get( authMw ,isAdmin,User.list)
    .post(User.create)  



router.route('/:id')
    .get( authMw ,isLoggedOrisAdmin ,User.read)
    .put(authMw ,isLogged , User.update)
    .patch(authMw ,isLogged , User.update)
    .delete( authMw ,isLogged ,User.delete)

module.exports = router
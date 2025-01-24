const router = require('express').Router();

const auth = require('../controllers/authController');

const authMw = require('../middlewares/authMiddleware');

router.post('/register', auth.register);//  /api/auth/register

router.post('/login', auth.login); // /api/auth/login

router.post('/refresh',authMw, auth.refresh);// /api/auth/refresh    (If the "Rememeber me" button is selected)

router.all('/logout',authMw, auth.logout); //api/auth/logout 

//router.put('/details', authMw , auth.updateDetails);//api/auth/details

//router.put('/password',  auth.forgetPassword);//api/auth/forgetPassword

module.exports = router;

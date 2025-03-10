const router = require("express").Router();

const auth = require("../controllers/authController");

const authMw = require("../middlewares/authMiddleware");

router.post("/register", auth.register); //  /api/auth/register

router.post("/login", auth.login); // /api/auth/login

router.post("/refresh", authMw, auth.refresh); // /api/auth/refresh    (If the "Rememeber me" button is selected)

router.all("/logout", auth.logout); //api/auth/logout

router.post("/forgot-password", auth.forgotPassword); // /api/auth/forgot-password

router.post("/reset-password/:resetToken", auth.resetPassword); // /api/auth/reset-password/{token}

module.exports = router;

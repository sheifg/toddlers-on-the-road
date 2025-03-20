const router = require("express").Router();

// route        http://127.0.0.1:8000/api/users
router.use("/users", require("./userRoute")); //  /api/users
router.use("/auth", require("./authRoute")); //  /api/auth
router.use("/country", require("./countryRoute")); //  /api/country
router.use("/packlist", require("./packListRoute")); //  /api/packlist
router.use("/profiles", require("./profileRoute")); //  /api/profiles
router.use("/contact", require("./contactRoute")); //  /api/contact
module.exports = router;

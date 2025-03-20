const router = require("express").Router();
const Contact = require("../controllers/contactController");
router.route("/").post(Contact.sendConfirmEmail);

module.exports = router;

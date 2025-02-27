const router = require("express").Router();

const Profile = require("../controllers/profileController");
// Authentication middleware :
const authMw = require("../middlewares/authMiddleware");

router
  .route("/:id")
  .get(authMw, Profile.read)
  .put(authMw, Profile.update)

module.exports = router;

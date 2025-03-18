const router = require("express").Router();

const Profile = require("../controllers/profileController");
// Authentication middleware :
const authMw = require("../middlewares/authMiddleware");
// Upload middleware:
const upload = require('../middlewares/upload')

router
  .route("/:id")
  .get(authMw, Profile.read)
  // .put(authMw, Profile.update)
  // .put(authMw, upload.array('images'), Profile.update)
  .put(authMw, Profile.update)

module.exports = router;

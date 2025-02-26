const router = require("express").Router();

const Profile = require("../controllers/profileController");
// Authentication middleware :
const authMw = require("../middlewares/authMiddleware"); /* Protecting the user route: without log in is not possible to access the country route */

router
  .route("/")
  .get(Profile.list)
  .post(authMw ,Profile.create);

router
  .route("/:id")
  .get(authMw ,Profile.read)
  .put(authMw ,Profile.update)
  .patch(authMw ,Profile.update)
  .delete(authMw ,Profile.delete);

module.exports = router;
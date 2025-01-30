const router = require("express").Router();
// Import controller:
const User = require("../controllers/userController");
// Authentication middleware :
const authMw = require("../middlewares/authMiddleware"); /* Protecting the user route: without log in is not possible to access the user route */

const { isLogged } = require("../middlewares/permissions");

router
  .route("/")
   .get( User.list)
  .post(User.create);

router
  .route("/:id")
  .get(authMw, isLogged, User.read)
  .put(authMw, isLogged, User.update)
  .patch(authMw, isLogged, User.update)
  .delete(authMw, isLogged, User.delete);

module.exports = router;

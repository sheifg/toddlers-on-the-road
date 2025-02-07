const router = require("express").Router();
// Import controller:
const PackList = require("../controllers/packlistController");
// Authentication middleware :
const authMw = require("../middlewares/authMiddleware"); /* Protecting the user route: without log in is not possible to access the PackList route */

const { isLogged } = require("../middlewares/permissions");



router
  .route("/")
  .get(PackList.list)
  .post(PackList.create);

router
  .route("/:id")
  .get(PackList.read)
  .put(authMw,isLogged,PackList.update)
  .patch(authMw,isLogged,PackList.update)
  .delete(authMw,isLogged,PackList.delete);

module.exports = router;

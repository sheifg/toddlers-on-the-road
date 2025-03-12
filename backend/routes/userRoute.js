const router = require("express").Router();
// Import authentication middleware
const authMw = require("../middlewares/authMiddleware")
// Import controller:
const User = require("../controllers/userController");

router.route("/").post(User.create);

// Separate Firebase route
router.post("/firebase", User.createWithfirebase); // Specific endpoint for Firebase

router.put("/change-password", authMw, User.changePassword); // /api/users/change-password

router.put("/update-personal-details", authMw, User.updatePersonalDetails); // /api/users/update-personal-details

router.delete("/delete-account/:id", authMw, User.deleteAccount); // /api/users/delete-account

module.exports = router;

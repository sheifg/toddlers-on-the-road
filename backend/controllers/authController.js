// Login
// Logout
// Refresh Token!

// User model:
const User = require("../models/userModel");
// JWT:
const jwt = require("jsonwebtoken");
// pwEncrypt:
const pwEncrypt = require("../helpers/pwEncryption");

module.exports = {
  //POST  /api/auth/register
  register: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({
        success: true,
        user,
        message: "User created successfully",
        token: jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
          expiresIn: "3d",
        }),
      });
    } catch (err) {
      console.log("error during registration", err);
    }
  },

  // POST  /api/auth/login
  login: async (req, res) => {
  
    const { email, password, rememberMe } = req.body;
    if (email && password) {
      const user = await User.findOne({ email }).select("+password"); //we get pw from db
   
      if (user && user.password == pwEncrypt(password)) {
        // pw from db compare with pw from req.body
        // toJson to return plain object from db wich is just user data,without any of the internal metadata or non-enumerable properties
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
          expiresIn: "120min",
        });

        
        const refreshToken = jwt.sign(
          { _id: user._id, password: user.password },
          process.env.REFRESH_KEY,
          { expiresIn: "7d" }
        );

        res.send({
          error: false,
          bearer: {
            access: accessToken,
            refresh: refreshToken,
          },
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong email or password!");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Invalid login credentials!");
    }
  },

  // ALL   /api/auth/logout
  logout: async (req, res) => {
    res.send({
      error: false,
      message: "Logged out when you delete your tokens!!!",
    });
  },

  // URL POST     /api/auth/refresh
  refresh: async (req, res) => {
    const refreshToken = req.body?.bearer?.refresh;

    if (refreshToken) {
      // VERIFY TOKEN:
      jwt.verify(refreshToken, process.env.REFRESH_KEY, async (err, data) => {
        if (err) {
          res.errorStatusCode = 401;
          throw new Error("Invalid refresh token!");
        } else {
          const { _id, password } = data;

          if (_id && password) {
            const user = await User.findOne({ _id }).select("+password"); // here we can't make query for get the user and compare the encrypted pw at the same time. So we have to get the user and then compare
            // Remember we can't tell mongoose to query for encrypted values!
            if (user && user.password == password) {
              // Check if the user is active
             
                // SEND A NEW ACCESS TOKEN!!!
                const accessToken = jwt.sign(
                  user.toJSON(),
                  process.env.ACCESS_KEY,
                  { expiresIn: "3d" }
                );
                res.send({
                  error: false,
                  bearer: {
                    access: accessToken,
                  },
                });
              
            } else {
              res.errorStatusCode = 401;
              throw new Error("User not found - BAD TOKEN!");
            }
          } else {
            res.errorStatusCode = 401;
            throw new Error("Invalid token data!");
          }
        }
      });
    } else {
      res.errorStatusCode = 401;
      throw new Error("No refresh token provided!");
    }
  },

  // @URL     PUT /api/auth/details
  // This function will be used in profile page to change/edit the user data
  // @access  private (req.user)
  /*  updateDetails: async (req, res) => {
    const user = await User.findById(req.user._id).select("+password");
    const fieldsToUpdate = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword,
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      fieldsToUpdate,
      {
        // We retrieve the user data after updated it, without changing the password
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User details updated successfully",
    });
  },
 */
  // @URL     PUT /api/auth/password
  // This function will be used in the profile page btn reset password
  // @access  private (req.user)
  /* updatePassword: async (req, res) => {
    // Here the user is logged in, knowing the old password and wanting to reset or update it
    const user = await User.findById(req.user._id).select("+password");
    // Check the password
    if (user && user.password == pwEncrypt(req.body.currentPassword)) {
      // User will enter the old password as currentPassword and the new one as newPassword
      user.password = req.body.newPassword;
      await user.save();
      res.status(200).json({
        success: true,
        message: "User password updated successfully",
      });
    } else {
      res.errorStatusCode = 401;
      throw new Error("Invalid credentials");
    }
  }, */
  /* This function ensures that the user's current password is verified before allowing to update it to a new one, providing an additional layer of security */

  deleteAccount: async (req, res) => {
    const user = await User.findById(req.user._id).select("+password");
    const data = await User.deleteOne({ _id: req.user.id });

    res.status(204).send({
      success: true,
      message: "User account deleted successfully",
      data,
    });
  },
};

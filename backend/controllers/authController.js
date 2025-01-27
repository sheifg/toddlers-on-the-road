// Login
// Logout
// Refresh Token!

// User model:
const User = require("../models/userModel");
// JWT:
const jwt = require("jsonwebtoken");
// pwEncrypt:
const pwEncrypt = require("../helpers/pwEncryption");
const { generateToken } = require("../helpers/token");
const { sendEmail } = require("../helpers/sendEmail");

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
          expiresIn: "120m",
        });

        
        const refreshToken = jwt.sign(
          { _id: user._id, password: user.password },
          process.env.REFRESH_KEY,
          { expiresIn: "7d" }
        );

        res.send({
          error: false,
          // bearer: {
          //   access: accessToken,
          //   refresh: refreshToken,
          // },
          user : await User.findOne({ email }),
          token:{
            access: accessToken
          }
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

  // Generate and send password reset email
  // URL POST     /api/auth/forgot-password
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      let user;

      try {
        // Find user by email
        user = await User.findOne({ email });

        // If the user can't be found
        if (!user) {
          return res.status(200).json({
            message: "An account with that email could not be found",
          });
        }
      } catch (error) {
        console.error("Find user by email error:", error);
        return res.status(500).json({
          message: "Error finding user",
        });
      }

      // Generate reset token
      const resetToken = generateToken();

      try {
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now
        await user.save();
      } catch (error) {
        console.error("Update reset token:", error);
        return res.status(500).json({
          message: "Error updating reset token",
        });
      }

      // Create the reset URL
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

      // Email content
      const message = `
        Hi ${user.first_name},

        You recently requested to rest your password. Please click the link below to proceed:

        <a href="${resetUrl}">${resetUrl}</a>

        This password reset link is only valid for the next 60 minutes.
        
        If you did not request a password reset, please ignore this email :)

        Sincerely,
        Your <i>Toddlers on the Road</i> team
      `;

      try {
        // Send email
        await sendEmail({
          email: user.email,
          subject: "Request to reset you password",
          message,
        });
      } catch (error) {
        console.error("Sending email error:", error);
        return res.status(500).json({
          message: "Error sending email",
        });
      }

      res.status(200).json({
        message:
          "If an account exists with this email, you will receive password reset instructions.",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      res
        .status(500)
        .json({ message: "Error processing password reset request" });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { resetToken } = req.params;
      const { new_password } = req.body;
      let user;

      try {
        // Find user with valid reset token
        user = await User.findOne({
          resetPasswordToken: resetToken,
        });
      } catch (error) {
        console.error("Find user with valid reset token:", error);
        return res.status(500).json({
          message: "Error finding user",
        });
      }

      const currentTime = Date.now();
      const expiryTime = user.resetPasswordExpires.getTime();

      // Check if user exists and token hasn't expired
      if (!user || expiryTime < currentTime) {
        return res.status(400).json({
          message: "Password reset token is invalid or has expired",
        });
      }

      user.password = new_password;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      try {
        // Update password and clear reset token fields
        await user.save();
      } catch (error) {
        console.error("Update password error:", error);
        res.status(500).json({ message: "Error updating password" });
      }

      res.status(200).json({ message: "Password successfully reset" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Error resetting password" });
    }
  },

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

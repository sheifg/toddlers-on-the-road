"use strict";
const pwEncrypt = require("../helpers/pwEncryption");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
module.exports = {
  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },

  createWithfirebase: async (req, res) => {
    try {
      // 1. Log incoming data for debugging
      console.log("Firebase signup request:", req.body);

      const { email, username, provider, password } = req.body;

      // 2. Check for existing user
      let user = await User.findOne({ email });

      if (user) {
        // 3. If user exists, update provider if needed
        if (provider !== "firebase") {
          user.provider = "firebase";
          user.password = password; // Firebase UID
          await user.save();
        }
      } else {
        // 4. Create new user
        user = new User({
          email,
          username,
          provider: "firebase",
          password, // Firebase UID
        });
        await user.save();
      }

      // 5. Generate JWT token
      const token = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
        expiresIn: "120m",
      });

      // 6. Send success response
      res.status(201).json({
        error: false,
        user: user,
        message: "User created successfully",
        token: token,
      });
    } catch (error) {
      // 7. Error handling
      console.error("Firebase user creation error:", error);
      res.status(500).json({
        error: true,
        message: error.message || "Error creating user",
      });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { old_password, new_password, user_id } = req.body;

      let user;

      // Find the user
      try {
        user = await User.findById(user_id).select("+password");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        console.error("Find user with id:", error);
        return res.status(500).json({
          message: "Error finding user",
        });
      }

      // Check match with old password
      try {
        const hashedOldPassword = pwEncrypt(old_password);

        if (hashedOldPassword !== user.password) {
          return res.status(400).json({ message: "Incorrect old password" });
        }
      } catch (error) {
        console.error("Check match of old password:", error);
        return res.status(500).json({
          message: "Error checking old password",
        });
      }

      // Hash the new password
      let hashedNewPassword;
      try {
        hashedNewPassword = pwEncrypt(new_password);
      } catch (error) {
        return res.status(500).json({ message: "Error hashing new password" });
      }

      // Update user password in the DB
      let updatedUser;
      try {
        updatedUser = await User.findByIdAndUpdate(
          user_id,
          { password: hashedNewPassword },
          { new: true }
        );
      } catch (error) {
        console.error("Updating the user's password:", error);
        return res.status(500).json({ message: "Error updating new password" });
      }

      if (!updatedUser) {
        return res.status(500).json({ message: "Failed to update password" });
      }

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Error changing password" });
    }
  },

  updatePersonalDetails: async (req, res) => {
    try {
      const { first_name, last_name, email, _id } = req.body;

      let user;

      // Find the user
      try {
        user = await User.findById(_id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        console.error("Find user with id:", error);
        return res.status(500).json({
          message: "Error finding user",
        });
      }

      // Update user password in the DB
      let updatedUser;
      try {
        updatedUser = await User.findByIdAndUpdate(
          user._id,
          { first_name: first_name, last_name: last_name, email: email },
          { new: true }
        );
      } catch (error) {
        console.error("Updating the user's personal details:", error);
        return res
          .status(500)
          .json({ message: "Error updating the user's personal details" });
      }
      if (!updatedUser) {
        return res
          .status(500)
          .json({ message: "Failed to update personal details" });
      }

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Updating personal details error:", error);
      res.status(500).json({ message: "Error personal details" });
    }
  },

  deleteAccount: async (req, res) => {
    try {
      const data = await User.findByIdAndDelete({ _id: req.params.id });

      res.status(204).send({
        success: true,
        message: "User account deleted successfully",
        data,
      });
    } catch (error) {
      console.error("Deleting account error:", error);
      res.status(500).json({ message: "Error deleting account" });
    }
  },
};

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const pwEncrypt = require("../helpers/pwEncryption");

module.exports = {
  register: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({
        success: true,
        user,
        message: "User created successfully",
        token: jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
          expiresIn: "120min",
        }),
      });
    } catch (err) {
      console.log("error during registration", err);
    }
  },

  login: async (req, res) => {
    const { email, password, rememberMe } = req.body;
    if (email && password) {
      const user = await User.findOne({ email }).select("+password");

      if (user && user.password == pwEncrypt(password)) {
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
          expiresIn: "120m"});

        if (rememberMe) {
          const refreshToken = jwt.sign(
            { _id: user._id, password: user.password },
            process.env.REFRESH_KEY,
            { expiresIn: "7d" }
          );

          // Fixed cookie setting
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: "strict",
            path: "/",  // Added path
            maxAge: 7 * 24 * 60 * 60 * 1000
          });
        }

        res.send({
          error: false,
          user: await User.findOne({ email }),
          token: accessToken
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

  logout: async (req, res) => {
    // Fixed cookie clearing
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: "strict",
      path: "/",  // Added path
      maxAge: 0
    });

    res.send({
      error: false,
      message: "Logged out successfully!!!!",
    });
  },

  refresh: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      jwt.verify(refreshToken, process.env.REFRESH_KEY, async (err, data) => {
        if (err) {
          res.errorStatusCode = 401;
          throw new Error("Invalid refresh token!");
        } else {
          const { _id, password } = data;

          if (_id && password) {
            const user = await User.findOne({ _id }).select("+password");
            if (user && user.password == password) {
              const accessToken = jwt.sign(
                user.toJSON(),
                process.env.ACCESS_KEY,
                { expiresIn: "120min" }
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

  deleteAccount: async (req, res) => {
    // Fixed cookie clearing
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: "strict",
      path: "/",  // Added path
      maxAge: 0
    });

    const data = await User.deleteOne({ _id: req.user.id });

    res.status(204).send({
      success: true,
      message: "User account deleted successfully",
      data,
    });
  },
};
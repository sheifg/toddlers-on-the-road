"use strict";
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
module.exports = {

  list: async (req, res) => {
    const data = await res.getModelList(User);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      data,
    });
  },

  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },


  createWithfirebase:async (req, res) => {
    try {
        // 1. Log incoming data for debugging
        console.log('Firebase signup request:', req.body);

        const { email, username, provider, password } = req.body;

      /*   // 2. Validate required fields
        if (!email || !username) {
            return res.status(400).json({
                error: true,
                message: "Email and username are required"
            });
        }
 */
        // 3. Check for existing user
        let user = await User.findOne({ email });
        
        if (user) {
            // 4. If user exists, update provider if needed
            if (provider !== 'firebase') {
                user.provider = 'firebase';
                user.password = password; // Firebase UID
                await user.save();
            }
        } else {
            // 5. Create new user
            user = new User({
                email,
                username,
                provider: 'firebase',
                password, // Firebase UID
            });
            await user.save();
        }

        // 6. Generate JWT token
        const token = jwt.sign(
              user.toJSON(),
            process.env.ACCESS_KEY,
            { expiresIn: "120min" }
        );

        // 7. Send success response
        res.status(201).json({
            error: false,
            user: user,
            message: "User created successfully",
            token :token
        });

    } catch (error) {
        // 8. Error handling
        console.error('Firebase user creation error:', error);
        res.status(500).json({
            error: true,
            message: error.message || 'Error creating user'
        });
    }
},

  read: async (req, res, next) => {
    const data = await User.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    ); //blog
    res.status(202).send({
      error: false,
      data,
    });
  },
  
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};

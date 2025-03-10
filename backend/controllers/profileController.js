"use strict";
const User = require("../models/userModel");

module.exports = {
  read: async (req, res) => {
    const data = await User.findOne(
      { _id: req.params.id },
      { packLists: 1 } //send to the frontend just the packLists from the user
    );
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    console.log("body", req.body);
    const data = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(202).send({
      error: false,
      data,
    });
  },
};

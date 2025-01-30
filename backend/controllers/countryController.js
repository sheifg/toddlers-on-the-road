"use strict";
const Country= require("../models/countryModel");

module.exports = {

  list: async (req, res) => {
    const data = await res.getModelList(Country);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Country),
      data,
    });
  },

  create: async (req, res) => {

    const imageNames = []; 
    if (req.files && req.files.length > 0) {
        for (let file of req.files) {
            
            imageNames.push('/uploads/' + file.filename);
           
        }
    }
    const data = await Country.create({
        ...req.body,
        images: imageNames  
    });
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res, next) => {
    const data = await Country.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await Country.findByIdAndUpdate(
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
    const data = await Country.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};

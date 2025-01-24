"use strict"
const User = require('../models/userModel')

module.exports = {

    list: async (req, res) => {
         // It is necessary to add permission: the user can just list his account/data, the user can't list the other users
       
       
        const customFilters = req.user?.isAdmin ? {} : { _id: req.user._id }  
        const data = await res.getModelList(User, customFilters)


        res.status(200).send({
            error: false,
           
           details: await res.getModelListDetails(User, customFilters),
            data
        })

    },
    create: async (req, res) => {

        //need permition ,who create a user as admin ,normal user cant make hemself admin
         // only admins can create new admins 
         if(!req.user?.isAdmin) {//means normal user try to make hemself as admin, it will be not posssible
            req.body.isAdmin = false
        }
        const data = await User.create(req.body)
        res.status(201).send({
            error: false,
            data
        })

    },
    read: async (req, res, next) => {
        
        const customFilters = (req.user?.isAdmin || req.user) ? { _id: req.params.id } : { _id: req.user._id }
         const data = await User.findOne(customFilters)
         res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        // if the user is not an admin, they can only update themselves:
        //need permission

       // const data = await User.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
       const data = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, {new: true, runValidators: true}) //blog
        res.status(202).send({
            error: false,
            data,
           // new: await User.findOne({ _id: req.params.id }),
        })

    }, delete: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

        // need permissions just for Admin to delete user

      

            const data = await User.deleteOne({ _id: req.params.id })
    
            res.status(data.deletedCount ? 204 : 404).send({
                error: !data.deletedCount,
                data
            })

      
    },
}

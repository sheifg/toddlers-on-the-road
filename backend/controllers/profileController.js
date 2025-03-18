"use strict";
const User = require("../models/userModel");
const fs = require('fs');
const path = require('path');

module.exports = {
  read: async (req, res) => {
    const data = await User.findOne(
      { _id: req.params.id },
      { packLists: 1, milestones: 1 } // Sending only the user's packlists and milestones from the database
    );
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    try {
      console.log("Update profile request received");
      
      // Check if the request body is empty
      if (!req.body) {
        console.error("Request body is empty");
        return res.status(400).send({
          error: true,
          message: "Request body is empty"
        });
      }
      
      console.log("Request body type:", typeof req.body);
      console.log("Request body keys:", Object.keys(req.body));
      
      const { milestones, packLists } = req.body;
      
      // Log the raw data for debugging
      console.log("Raw milestones data:", milestones);
      console.log("Raw packLists data:", packLists);
      
      // Handle milestones whether it's a string or already an object
      let parsedMilestones;
      if (milestones) {
        try {
          // Check if milestones is a string that needs parsing
          parsedMilestones = typeof milestones === 'string' 
            ? JSON.parse(milestones) 
            : milestones;
          console.log("Successfully processed milestones:", parsedMilestones);
        } catch (e) {
          console.error("Error parsing milestones JSON:", e);
          console.error("Milestones data that failed to parse:", milestones);
          parsedMilestones = [];
        }
      } else {
        parsedMilestones = [];
      }
      
      // Process base64 images if they exist
      if (Array.isArray(parsedMilestones)) {
        const fs = require('fs');
        const path = require('path');
        const uploadsDir = './uploads-user';
        
        // Create uploads directory if it doesn't exist
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        
        for (let i = 0; i < parsedMilestones.length; i++) {
          const milestone = parsedMilestones[i];
          
          if (milestone && milestone.images && Array.isArray(milestone.images)) {
            const processedImages = [];
            
            for (let j = 0; j < milestone.images.length; j++) {
              const image = milestone.images[j];
              
              // Check if this is a base64 image
              if (typeof image === 'string' && image.startsWith('data:image')) {
                try {
                  // Create a safe filename
                  const timestamp = Date.now();
                  const randomString = Math.random().toString(36).substring(2, 15);
                  const filename = `milestone_${timestamp}_${randomString}.jpg`;
                  const filePath = path.join(uploadsDir, filename);
                  
                  // Remove the data:image/xyz;base64, prefix
                  const base64Data = image.split(';base64,').pop();
                  
                  // Write the file
                  fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
                  
                  // Add the path to processed images
                  processedImages.push(`/uploads-user/${filename}`);
                  console.log(`Saved image to ${filename}`);
                } catch (error) {
                  console.error("Error processing base64 image:", error);
                  // If there's an error, use a default image
                  processedImages.push("/milestone-travel.jpg");
                }
              } else {
                // Not a base64 string, keep as is (could be an existing path)
                processedImages.push(image);
              }
            }
            
            // Update the milestone with processed images
            parsedMilestones[i].images = processedImages;
          }
        }
      }
      
      // Process any traditional file uploads
      if (req.files && req.files.length > 0) {
        req.files.forEach((file, index) => {
          const milestoneIndex = index; // Match the index of the milestone to the file
          if (!parsedMilestones[milestoneIndex].images) {
            parsedMilestones[milestoneIndex].images = [];
          }
  
          if (parsedMilestones[milestoneIndex].images.length < 5) {
            parsedMilestones[milestoneIndex].images.push(
              `/uploads-user/${file.filename}`
            );
          }
        });
      }
  
      // Update the user in the database
      console.log("Attempting to update user with ID:", req.params.id);
      const data = await User.findByIdAndUpdate(
        { _id: req.params.id },
        {
          packLists,
          milestones: parsedMilestones,
        },
        { new: true, runValidators: true }
      );
      
      if (!data) {
        console.error("User not found with ID:", req.params.id);
        return res.status(404).send({
          error: true,
          message: "User not found"
        });
      }
      
      console.log("User updated successfully");
      res.status(202).send({
        error: false,
        data,
      });
    } catch (error) {
      console.error("Profile update error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code
      });
      
      res.status(500).send({
        error: true,
        message: "Server error while updating profile: " + error.message
      });
    }
  }
};
const mongoose = require("mongoose");
const AssignmentSchema = require('../../../models/AssignmentSchema');
const ClassSchema = require("../../../models/ClassSchema")
const cloudinary = require('cloudinary').v2;
const { config } = require('dotenv');
const path = require('path');
const fs = require('fs');
const TopicSchema = require('../../../models/TopicSchema')

const createAssignment = async (req, res) => {
    try {
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET 
        });
        
        let files = [];
        
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(async (file) => {
                try {
                    const result = await cloudinary.uploader.upload(file.path, {
                        resource_type: "auto", 
                    });
                    
                    const newfile = {
                        filename: file.originalname,
                        cloudinary_url: result.secure_url,
                        cloudinary_id: result.public_id,
                        contentType: file.mimetype,
                    };
                    files.push(newfile);

                    // Clean up the temporary file
                    fs.unlinkSync(file.path);
                } catch (uploadError) {
                    console.error('Error uploading file:', uploadError);
                    throw uploadError;
                }
            });
            
            // Wait for all file uploads to complete
            await Promise.all(uploadPromises);
        }
        
        const { title, instructions, assignmentType, classId, TopicId } = req.body;
        
        // Create new assignment
        const newAssignment = new AssignmentSchema({
            title: title,
            instructions: instructions,
            assignmentType: assignmentType,
            attachments: {
                files: files,
                urls: req.body.links ? JSON.parse(req.body.links) : []
            }
        });
        
        // Save the assignment
        const assignment = await newAssignment.save();
        
        if (!assignment) {
            return res.status(400).json({ success: false, message: "Failed to create assignment" });
        }
        
        // Update the appropriate schema with the new assignment
        if (TopicId) {
            await TopicSchema.findByIdAndUpdate(TopicId, {
                $push: {
                    assignment: [{
                        AId: assignment._id
                    }]
                }
            });
        } else {
            await ClassSchema.findByIdAndUpdate(classId, {
                $push: {
                    assignment: [{
                        AId: assignment._id
                    }]
                }
            });
        }
        
        // Send success response after everything is complete
        return res.status(200).json({
            success: true,
            message: "Assignment added successfully",
            assignmentId: assignment._id
        });
        
    } catch (error) {
        console.error('Error in createAssignment:', error);
        // Clean up any uploaded files if there was an error
        if (req.files) {
            req.files.forEach(file => {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            });
        }
        return res.status(500).json({
            success: false,
            message: "Error creating assignment",
            error: error.message
        });
    }
};

module.exports = createAssignment;
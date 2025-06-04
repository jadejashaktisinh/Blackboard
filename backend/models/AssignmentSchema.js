const mongoose = require('mongoose');


const AssignmentSchema = new mongoose.Schema({

    title: String,
    instructions: String,
    assignmentType: { type: String, enum: ["assignment", "quiz", "material"] },
    postedAt:{
        type: Date,
        default: Date.now,
    },
    attachments: {
        files: [{
            filename: String,
            cloudinary_url: String,
            cloudinary_id: String,
            contentType: String,
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }],
        urls: [{ type: String }]
    }


})

module.exports = mongoose.model("assignments", AssignmentSchema);
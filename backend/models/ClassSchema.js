const mongoose = require('mongoose');
const AssignmentSchema = require('./AssignmentSchema');


const ClassSchema = new mongoose.Schema({

        C_Name:String,
        C_Creator:String,
        CID:{type:mongoose.Types.ObjectId,ref:"user"},
        C_Subject:String,
        C_Section:String,

        people:[{
            name:String,
            role:{type:String,enum:["teacher","student"]},
            userId:{type:mongoose.Types.ObjectId,ref:"user"},
            request:{
                type:String,
                enum:["pending","accepted","decline"]
            }

        }],
        assignment:[{
            AId:{type:mongoose.Schema.Types.ObjectId,ref:"assignments"}
        }],
        topic:[{
            TId:{type:mongoose.Schema.Types.ObjectId,ref:"topics"}
        }]
})

module.exports = new mongoose.model("classes",ClassSchema);
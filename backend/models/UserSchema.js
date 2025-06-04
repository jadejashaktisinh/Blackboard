const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    classes:[{
        class_id:{type: Schema.Types.ObjectId ,ref:'classes' },
        role:String,
        request:{
            type:String,
            enum:["pending","accepted","decline"]
        }
    }]

});

module.exports = mongoose.model("user",userSchema);
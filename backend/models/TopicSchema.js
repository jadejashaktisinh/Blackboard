const mongoose = require('mongoose');


const TopicSchema = new mongoose.Schema({
            T_name:String,
            assignment:[{
                AId:{type:mongoose.Schema.Types.ObjectId,ref:"assignments"}
            }]
})
 module.exports = mongoose.model("topics",TopicSchema);
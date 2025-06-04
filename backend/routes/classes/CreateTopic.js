const TopicSchema = require('../../models/TopicSchema');
const ClassSchema = require('../../models/ClassSchema');



const createTopic = async (req,res) =>{

    const {classId} = req.body
    const newTopic = new TopicSchema({...req.body});
    let topic = await newTopic.save();

      if(topic){
    
           await ClassSchema.findByIdAndUpdate(classId,{$push:{
                topic:[{
                    TId:topic._id
                }]
            }})
            res.status(200).json({success:true,message:"topic added"})
        }else{
            res.status(400).json({success:false,message:"something went wrong"})
    
        }


}
module.exports = createTopic
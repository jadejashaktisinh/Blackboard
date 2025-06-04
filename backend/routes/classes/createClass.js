const ClassSchema = require('../../models/ClassSchema'); 
const UserSchema = require('../../models/UserSchema');


const createClass = async (req,res)=>{

    console.log(req.body)
    const NewClass = new ClassSchema({...req.body});

      const Class = await NewClass.save();

      if(Class){

        await ClassSchema.findByIdAndUpdate(Class._id,{  $push: { 
          people:[{name:req.body.C_Creator,role:"teacher", request:"accepted",userId:req.body.CID}]
      }}).catch(()=>{
          return res.status(400).json({success:false,message:"something went wrong"})
  
      })
  
       await UserSchema.findByIdAndUpdate(req.body.CID,{  $push: { 
          classes:[{
              class_id:Class._id,
              role:"teacher",
              request:"accepted"
          }]
      }})
        return res.status(200).send({
            success:true,
            message:"Class created"
        })
      }else{
        return res.status(400).send({success:false,message:'something went wrong '})

      }


} 

module.exports = createClass
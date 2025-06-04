const ClassSchema = require('../../models/ClassSchema');
const UserSchema = require('../../models/UserSchema');
const sendEmail = require('./sendEmail')

const addPeople = async (req,res) =>{
    try {
        const {classId, email, role} = req.body

        const person = await UserSchema.findOne({email:email})
        if(!person){
            return res.status(400).json({success:false,message:"user dont exist"})
        }

        // Check if user is already in the class
        const existingMembership = await UserSchema.findOne({
            _id: person._id,
            'classes.class_id': classId
        })

        if(existingMembership) {
          
                        return res.status(400).json({
                            success: false,
                            message: "User already has a pending invitation to this class"
                         })
            
        }
        
        const classData = await ClassSchema.findById(classId)
        if(!classData) {
            return res.status(400).json({success:false,message:"class not found"})
        }

        // Add user to class with pending status
        await ClassSchema.findByIdAndUpdate(classId, {
            $push: { 
                people:[{
                    name: person.firstName + " " + person.lastName,
                    role: role,
                    request: "pending",
                    userId: person._id.toString()
                }]
            }
        })

        // Add class to user's classes with pending status
        await UserSchema.findByIdAndUpdate(person._id, {
            $push: { 
                classes:[{
                    class_id: classId,
                    role: role,
                    request: "pending"
                }]
            }
        })

        // Send email with class data
        await sendEmail(email, classData)
        res.status(200).json({success:true,message:"Invitation sent successfully"})

    } catch (error) {
        console.error(error)
        res.status(400).json({success:false,message:"something went wrong"})
    }
}

module.exports = addPeople
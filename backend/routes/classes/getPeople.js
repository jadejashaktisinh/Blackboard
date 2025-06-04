const ClassSchema = require('../../models/ClassSchema');
const UserSchema = require('../../models/UserSchema');

const getPeople = async (req,res) =>{

    const {classId} = req.params

    const classData = await ClassSchema.findById(classId)           
    console.log(classData)
    
    let teacher = classData.people.filter((item ) => {return item.role == 'teacher'})
    let student = classData.people.filter((item ) => {return item.role == 'student'})

    res.status(200).json({success:true,message:"done",data:{teacher:teacher, student:student}})
}

module.exports = getPeople

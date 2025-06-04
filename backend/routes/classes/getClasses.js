const ClassSchema = require('../../models/ClassSchema');
const UserSchema = require("../../models/UserSchema");


const getClasses = async (req,res) => {
    

    const {uid} = req.params

    const classes = UserSchema.findById(uid).populate("classes.class_id") .then(user => {
        console.log(user.classes); 
        res.status(200).json(user.classes)
    })
    .catch(err => {
        console.error(err);
        res.status(4000).json({message:err})
    });

}
module.exports = getClasses
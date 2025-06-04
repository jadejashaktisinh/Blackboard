const userSchema = require('../../models/UserSchema');
const bcrypt = require('bcrypt');

const getUser = async (req,res) =>{

    let ExistingUser = await userSchema.findById(req.params.id);

    if(ExistingUser){
            res.status(200).send({
                success:true,
                name:ExistingUser.firstName +" "+ ExistingUser.lastName,
            })
     
    }else{
        return res.status(400).send({success:false,message:'user does not exists'})
    }
}

module.exports = getUser
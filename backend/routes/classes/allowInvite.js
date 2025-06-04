const ClassSchema = require('../../models/ClassSchema');
const UserSchema = require('../../models/UserSchema');

const allowInvite = async (req, res) => {
    try {
        const { classId, userId } = req.body;

        // Update class document - find the person in people array and update their request status
        const updatedClass = await ClassSchema.updateOne(
            { 
                _id: classId,
                "people.userId": userId
            },
            {
                $set: {
                    "people.$.request": "allowed"
                }
            }
        );

        // Update user document - find the class in classes array and update its request status
        const updatedUser = await UserSchema.updateOne(
            {
                _id: userId,
                "classes.class_id": classId,
            
            },
            {
                $set: {
                    "classes.$.request": "allowed"
                }
            }
        );

        if (updatedClass.modifiedCount > 0 && updatedUser.modifiedCount > 0) {
            return res.status(200).json({ success: true, message: "Invitation accepted successfully" });
        } else {
            return res.status(400).json({ success: false, message: "No pending invitation found" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

module.exports = allowInvite;
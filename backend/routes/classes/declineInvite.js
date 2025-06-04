const ClassSchema = require('../../models/ClassSchema');
const UserSchema = require('../../models/UserSchema');

const declineInvite = async (req, res) => {
    try {
        const { classId, userId } = req.body;

        const updatedClass = await ClassSchema.updateOne(
            { _id: classId },
            { 
                $pull: { 
                    people: { userId: userId }
                }
            }
        );

       
        const updatedUser = await UserSchema.updateOne(
            { _id: userId },
            {
                $pull: {
                    classes: { class_id: classId }
                }
            }
        );

        if (updatedClass.modifiedCount > 0 && updatedUser.modifiedCount > 0) {
            return res.status(200).json({ success: true, message: "Invitation declined and removed successfully" });
        } else {
            return res.status(400).json({ success: false, message: "No invitation found" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

module.exports = declineInvite;

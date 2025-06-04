const ClassSchema = require('../../../models/ClassSchema'); 



const getAssignments = async (req,res) =>{

    const {cid} = req.params

    ClassSchema.findById(cid)
  .populate('assignment.AId')  
  .populate({
    path: 'topic.TId',         
    populate: {
      path: 'assignment.AId',  
      model: 'assignments'
    }
  })
  .then(classDoc => {
    const allAssignments = classDoc.assignment.map(a => a.AId); 
    const topicsWithAssignments = classDoc.topic.map(t => ({
      topicId:t.TId._id,
      topicName: t.TId.T_name,
      assignments: t.TId.assignment.map(a => a.AId)
    }));

    console.log("All Assignments:", allAssignments);
    console.log("Assignments Grouped by Topics:", topicsWithAssignments);

    res.status(200).json({"allAssignments":allAssignments,"topicsWithAssignments":topicsWithAssignments})
  })
  .catch(err => {
    console.error(err);
  });


}

module.exports = getAssignments
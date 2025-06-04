const ClassSchema = require('../../../models/ClassSchema'); 


const getStreamAssignment = async (req,res )=>{


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

    const topicsWithAssignments = classDoc.topic.flatMap(t => 
       t.TId.assignment.map(a => a.AId)
    );

    const StreamAssignments = [...allAssignments, ...topicsWithAssignments];


    StreamAssignments.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

   
   res.status(200).json({"StreamAssignments":StreamAssignments})

  })
  .catch(err => {
    console.error(err);
  });
}

module.exports = getStreamAssignment
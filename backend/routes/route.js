const routes = require('express').Router();
const multer = require("multer");

const validationSignup = require('../middlewares/validationSignup');
const validationLogin = require('../middlewares/vakidationLogin');
const signup = require('./auth/Signup');
const login = require('./auth/Login');
const getUser = require('./auth/getUser')
const createClass  = require('./classes/createClass');
const addParticipents = require('./classes/AddPeople');
const createAssignment = require('./classes/Assignment/CreateAssignment')
const createTopic = require('./classes/CreateTopic')
const getClasses = require('./classes/getClasses')
const getAssignments = require('./classes/Assignment/getAssignentt')
const getStream = require('./classes/Assignment/getStreamAssignmnets')
const getPeople = require('./classes/getPeople')
const allowInvite = require('./classes/allowInvite')
const declineInvite = require('./classes/declineInvite')

const upload = multer({dest:"uploads/"}) 

routes.post("/signup",validationSignup,signup);
routes.post("/login",validationLogin,login);
routes.post("/create",createClass);
routes.post("/createassignment",upload.array('files', 10),createAssignment);
routes.post("/createtopic",createTopic);


routes.put("/addparticipent",addParticipents);
routes.put("/allow-invite", allowInvite)
routes.put("/decline-invite", declineInvite)


routes.get('/getclasses/:uid',getClasses);
routes.get('/getassignmnets/:cid',getAssignments);
routes.get('/getstreamassignmnets/:cid',getStream);
routes.get('/getpeople/:classId',getPeople);
routes.get('/getuser/:id',getUser);

module.exports = routes
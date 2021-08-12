// Importing Dependencies

const express = require('express');
const router = express.Router();
const app = express();
const methodOverride = require('method-override');
const fetch = require('node-fetch');
let bodyParser = require('body-parser');
// const { allowedNodeEnvironmentFlags } = require('process');

// User Comment Collections
const projectOverview = require('../models/projects/projectSchema.js');

// const commentSeedData for seeding user comments:
const projectseedData = require('../models/projects/projectseedData.js')
// Middleware

router.use(express.urlencoded({ extended: true}));
router.use(methodOverride('_method'));
router.use(express.json({
    type: ['application/json', 'text/plain']
  }))
  router.use(bodyParser.json());

// Index Route

router.get('/', (req, res) =>{
    console.log("test project");
    console.log(req.params)
    projectOverview.find({}, (err, foundProjects) => {
        res.json(foundProjects)
        console.log(foundProjects)
})
})

// Seed Data Route /project/seedprojects change the URL 
router.get("/seedprojects", (req, res) =>{
    projectOverview.create(projectseedData, (err, seedProjects) => {
           console.log(seedProjects);
        res.redirect("/");
    })
    console.log("seededproject")
}); 

// POST COMMENTS
router.post('/', (req, res) => {
    projectOverview.create([{
        title: req.body.title,
        client: req.body.client,
        status: req.body.status,
        dateUploaded: new Date(Date.now()).toLocaleString(),
        dueDate: req.body.dueDate,
        clientToDo: req.body.clientToDo,
        username: req.body.username,
        onTrack: req.body.onTrack, 
        approved: req.body.approved,
        Notes: req.body.Notes,
        version: req.body.version,
    }], (error, createdProject) => {
        console.log("project created" + createdProject);
        if (error){
            return console.log(error)
        }
    })
    console.log (req.body)
    console.log('testing post')
});

// // Find route
// router.get('/:id', async(req, res) =>{
//     await userComment.find({id: req.params.id}, (error, foundComments)=>{
//         console.log(req.params)
//         console.log(foundComments)
//         console.log(error)
//         res.send(foundComments)
//     }) 
// });

// // UPDATE route - EDIT
// router.get('/:id/edit', async(req, res) =>{
//     userComment.findById(req.params.id, (error, oneComment)=>{
//         console.log(req.params.id)
//         console.log(oneComment)
//         console.log(error)
//         res.send(oneComment)
//     }) 
// });

// // UPDATE route - PUT
// router.put('/:id', async(req, res) =>{
//     userComment.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedComment)=>{
//         console.log(req.params.id + " and this is the req body: " + req.body)
//         console.log(updatedComment)
//         console.log(error)
//         res.send(updatedComment)
//     }) 
// });

// // UPDATE route - DELETE
// router.delete('/:id', async(req, res) =>{
//     await userComment.findOneAndRemove({_id: req.params.id}, (error, deletedComment)=>{
//         console.log({_id:req.params.id})
//         console.log(deletedComment)
//         console.log(error)
//         res.send(deletedComment)
//     }) 
// });


// EXPORT
module.exports = router;
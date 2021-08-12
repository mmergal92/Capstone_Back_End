// Importing Dependencies

const express = require('express');
const router = express.Router();
const app = express();
const methodOverride = require('method-override');
const fetch = require('node-fetch');
let bodyParser = require('body-parser');

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


// EXPORT
module.exports = router;
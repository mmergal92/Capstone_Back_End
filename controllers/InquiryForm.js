// Importing Dependencies

const express = require('express');
const router = express.Router();
const app = express();
const methodOverride = require('method-override');
const fetch = require('node-fetch');
let bodyParser = require('body-parser');
// const { allowedNodeEnvironmentFlags } = require('process');

// User Comment Collections
const userInquiry = require('../models/inquiry/userInquiry.js')

// const commentSeedData for seeding user comments:
// const inquirySeedData = require('../models/inquiry/inquirySeedData.js')
// Middleware

router.use(express.urlencoded({ extended: true}));
router.use(methodOverride('_method'));
router.use(express.json({
    type: ['application/json', 'text/plain']
  }))
  router.use(bodyParser.json());

// Index Route

router.get('/', (req, res) =>{
    console.log("test get");
    console.log(req.params)
    userInquiry.find({}, (err, foundUserComments) => {
        res.json(foundUserComments)
        console.log(foundUserComments)
})
})
// Seed Data Route /inquiry/seedinquiry change the URL 
// router.get("/seedinquiry", (req, res) =>{
//     userInquiry.create(inquirySeedData, (err, createdComments) => {
//            console.log(createdComments);
//         res.redirect("/");
//     })
// }); 

// POST COMMENTS
router.post('/', (req, res) => {
    userInquiry.create([{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        website_url: req.body.website_url,
        business_name: req.body.business_name,
        business_services: req.body.business_services,
        services_interest: req.body.services_interest,
        timeline_project: req.body.timeline_project,
        start_date: req.body.start_date,
        decisions: req.body.decisions,
    }], (error, createdComment) => {
        console.log("inquiry created" + createdComment);
        if (error){
            return console.log(error)
        }
    })
    console.log (req.body)
    console.log('testing post')
});

// Find route
router.get('/:id', async(req, res) =>{
    await userInquiry.find({id: req.params.id}, (error, foundComments)=>{
        console.log(req.params)
        console.log(foundComments)
        console.log(error)
        res.send(foundComments)
    }) 
});

// UPDATE route - EDIT
router.get('/:id/edit', async(req, res) =>{
    userInquiry.findById(req.params.id, (error, oneComment)=>{
        console.log(req.params.id)
        console.log(oneComment)
        console.log(error)
        res.send(oneComment)
    }) 
});

// UPDATE route - PUT
router.put('/:id', async(req, res) =>{
    userInquiry.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedComment)=>{
        console.log(req.params.id + " and this is the req body: " + req.body)
        console.log(updatedComment)
        console.log(error)
        res.send(updatedComment)
    }) 
});

// UPDATE route - DELETE
router.delete('/:id', async(req, res) =>{
    await userInquiry.findOneAndRemove({_id: req.params.id}, (error, deletedComment)=>{
        console.log({_id:req.params.id})
        console.log(deletedComment)
        console.log(error)
        res.send(deletedComment)
    }) 
});


// EXPORT
module.exports = router;
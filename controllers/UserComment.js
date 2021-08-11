// Importing Dependencies

const express = require('express');
const router = express.Router();
const app = express();
const methodOverride = require('method-override');
const fetch = require('node-fetch');
let bodyParser = require('body-parser');
// const { allowedNodeEnvironmentFlags } = require('process');

// User Comment Collections
const userComment = require('../models/comments/commentSchema.js');

// const commentSeedData for seeding user comments:
const commentSeedData = require('../models/comments/commentSeedData.js')
// Middleware

router.use(express.urlencoded({ extended: true}));
router.use(methodOverride('_method'));
router.use(express.json({
    type: ['application/json', 'text/plain']
  }))
  router.use(bodyParser.json());

// Index Route

router.get('/', (req, res) =>{
    console.log(req.session.test);
    console.log(req.params)
    userComment.find({}, (err, foundUserComments) => {
        res.json(foundUserComments)
        res.send('This page is for the user comments.')
})
})
// Seed Data Route /user/seedUsers change the URL 
// router.get("/seedUsers", (req, res) =>{
//     userComment.create(commentSeedData, (err, createdComments) => {
//            console.log(createdComments);
//         res.redirect("/");
//     })
// }); 

// POST COMMENTS
router.post('/', (req, res) => {
    userComment.create([{
        date: new Date(Date.now()).toLocaleString(),
        comment: req.body.comment,
        username: req.body.username,
    }], (error, createdComment) => {
        console.log("comment created" + createdComment);
        if (error){
            return console.log(error)
        }
    })
    console.log(req.body)
    console.log('testing post')
});

// Find route
// router.get('/', async(req, res) =>{
//     await userComment.find({symbol: req.params.symbol}, (error, foundComments)=>{
//         console.log(req.params)
//         console.log(foundComments)
//         console.log(error)
//         res.send(foundComments)
//     }) 
// });

// UPDATE route - EDIT
// router.get('/:id/edit', async(req, res) =>{
//     userComment.findById(req.params.id, (error, oneComment)=>{
//         console.log(req.params.id)
//         console.log(oneComment)
//         console.log(error)
//         res.send(oneComment)
//     }) 
// });

// UPDATE route - PUT
// router.put('/:symbol', async(req, res) =>{
//     userComment.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedComment)=>{
//         console.log(req.params.id + " and this is the req body: " + req.body)
//         console.log(updatedComment)
//         console.log(error)
//         res.send(updatedComment)
//     }) 
// });

// UPDATE route - DELETE
// router.delete('/:symbol/:id', async(req, res) =>{
//     await userComment.findOneAndRemove({_id: req.params.id}, (error, deletedComment)=>{
//         // console.log({_id:req.params.id})
//         // console.log(deletedComment)
//         // console.log(error)
//         res.send(deletedComment)
//     }) 
// });


// EXPORT
module.exports = router;
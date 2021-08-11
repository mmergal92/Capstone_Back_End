// Importing Dependencies

const express = require('express');
const router = express.Router();
const app = express();
const methodOverride = require('method-override');
const fetch = require('node-fetch');
let bodyParser = require('body-parser');

// Collection
const trelloData = require('../models/projects/trello.js')

// Middleware

router.use(express.urlencoded({ extended: true}));
router.use(methodOverride('_method'));
router.use(express.json({
    type: ['application/json', 'text/plain']
  }))
  router.use(bodyParser.json());

// Index Route

let id;
let description;
let title;
let dueDate;
let list;
let board;
let completed;
let shortUrl;

router.get('/', (req, res) =>{
    res.send('seeded')
})


// Seed Data Route /api/seed change the URL 

router.post("/show", (req, res) =>{
    console.log('correct page')
    fetch('https://api.trello.com/1/boards/60f1c7bc0f000467c2d5b79a/cards?key=02cb34e330c92a9adaf27b1889691dfe&token=1068c231c0bcc3efcf83e93ae31a9cf9625b21ed93f802bb92c1d5e40c0df415')
    .then(res => res.json())
    .then((data) => {

        for (let i = 0; i < data.length; i++){
            id = data[i].id;
            description = data[i].desc;
            title = data[i].name;
            dueDate = data[i].due;
            list = data[i].idList;
            board = data[i].idBoard;
            completed = data[i].dueComplete
            shortUrl = data[i].shortUrl

            const seedData = () => {
                trelloData.create([{
                    id: id,
                    description: description,
                    title: title,
                    dueDate: dueDate,
                    list: list,
                    board: board,
                    completed: completed,
                    shortUrl: shortUrl
                }], (error, createdData) =>{
                    console.log ("seading data")
                    if(error){
                        return console.log(error)
                    }
                })
            }
            seedData();
    }
    console.log ("data seeded")
});
});

router.get('/show', (req, res) =>{
    trelloData.find({}, (error, Data) =>{
        res.json(Data)
    })
});

module.exports = router;
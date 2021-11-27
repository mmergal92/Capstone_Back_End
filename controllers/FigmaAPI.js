const express = require('express')
const app = express()
const fetch = require('isomorphic-fetch');
const methodOverride = require('method-override');
let bodyParser = require('body-parser');
const router = express.Router();

require('dotenv').config();

router.use(express.urlencoded({ extended: true}));
router.use(methodOverride('_method'));
router.use(express.json({
    type: ['application/json', 'text/plain']
  }))
  router.use(bodyParser.json());

const FigmaAPIKey = "225481-275addd6-e4b4-41be-8ca8-c8827e17bfab"
const FigmaFileID = "GixSsF7GbinVsQXHdcOa6n"

router.get('/frames', async function (req, res, next) {
    console.log ("hello")
    async function figmaAPI(fileId){
        let result = await fetch('https://api.figma.com/v1/files/' + fileId , {
            method: 'GET',
            headers: {
            'X-Figma-Token': FigmaAPIKey
            }
        })

        let figmaFileStruct = await result.json()

        let figmaFrames = figmaFileStruct.document.children
            .filter(child => child.type === 'CANVAS')[0].children
            .filter(child => child.type === 'FRAME')

            .map(frame => {
                return {
                    name: frame.name,
                    id: frame.id
                }
            })

        let ids = figmaFrames.map(comp => comp.id).join(',')

        let imageResult = await fetch('https://api.figma.com/v1/images/' + fileId + '?scale=2&ids=' + ids, {
            method: 'GET',
            headers: {
                'X-Figma-Token': FigmaAPIKey
            }
        }).catch(error => console.log(error))

        let figmaImages = await imageResult.json()

        figmaImages = figmaImages.images


        return figmaFrames.map(frame => {
            return {
                name: frame.name,
                url: figmaImages[frame.id]
            }
        })  
    }
    let result = await figmaAPI(FigmaFileID).catch(error => console.log(error))
    res.send(result)
})

module.exports = router;
var express = require('express');
var router = express.Router();
const { checkBody } = require('../modules/checkBody')
require('../models/connection');
const Place = require('../models/place')

router.post('/', (req, res) => {
    if(!checkBody(req.body, ['name'])){
        res.json({result: false, error: 'Missing or empty fields'});
        return;
    }

    const newPlace = new Place({
        nickname: req.body.nickname,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    })
    newPlace.save().then(() => {
        res.json({result: true})
    }).catch(error => {
        res.json({result: false, error});
    });
}) 

router.get('/:nickname', (req,res) => {
    Place.find({nickname: req.params.nickname})
    .then(data => {
        res.json({result: true, places: data})
    })
})

router.delete('/', (req,res) => {
    const { nickname, name} = req.body

    Place.find({nickname: nickname, name: name}).then(place => {
        Place.deleteOne({nickname, name}).then(() => {
            res.json({result: true, name: name})
        }).catch(error => {
            res.json({result: false, error})
        })
    })
})

module.exports = router;

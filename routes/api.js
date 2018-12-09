
const express = require('express');
const router = express.Router();
const Album = require('../models/album');

router.get('/albums', (req, res, next) => {
    Album.find({}).then((albums) => {
        res.send(albums);
    });
});

router.post('/albums', (req, res, next) => {
    Album.create(req.body).then(() => {
        Album.find({}).then((albums) => {
            res.send(albums);
        });
    }).catch(next);
});


router.put('/albums/:id', (req, res, next) => {
    Album.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        /*
        Album.findOne({_id: req.params.id}).then((album) => {
            res.send(album);
        })
        res.send(album);
        */
        Album.find({}).then((albums) => {
            res.send(albums);
        });
    });
});

router.delete('/albums/:id', (req, res, next) => {
    Album.findByIdAndRemove({ _id: req.params.id }).then(() => {
        Album.find({}).then((albums) => {
            res.send(albums);
        });
    });
});

module.exports = router;
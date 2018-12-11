
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/posts', (req, res, next) => {
    Post.find({}).then((post) => {
        res.send(post);
    });
});

router.post('/posts', (req, res, next) => {
    Post.create(req.body).then(() => {
        Post.find({}).then((post) => {
            res.send(post);
        });
    }).catch(next);
});


router.put('/posts/:id', (req, res, next) => {
    Post.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        Post.find({}).then((post) => {
            res.send(post);
        });
    });
});

router.delete('/posts/:id', (req, res, next) => {
    Post.findByIdAndRemove({ _id: req.params.id }).then(() => {
        Post.find({}).then((post) => {
            res.send(post);
        });
    });
});

module.exports = router;
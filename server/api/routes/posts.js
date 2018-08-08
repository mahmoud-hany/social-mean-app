const express = require('express');
const passport = require('passport');
const Post = require('../models/post');

const router = express.Router();

const validatePostInput = require('../../validation/post');

/*
    @route  POST /posts
    @desc   Create new post
    @acess  private
*/
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        user: req.user.id,
        title: req.body.title,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar
    });

    newPost.save().then( post => {
        res.json(post);
    }).catch(err => {
        res.json(err);
    });
})


module.exports = router;
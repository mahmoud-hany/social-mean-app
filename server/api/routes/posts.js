const express = require('express');
const passport = require('passport');
const { ObjectId } = require('mongoose').Types;

const router = express.Router();

// Profile and Post models
const Post = require('../models/post');
const Profile = require('../models/profile');

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
});

/*
    @route  GET /posts
    @desc   Fetch all posts
    @acess  public
*/
router.get('/', (req, res) => {
    Post.find()
        .sort({ data: -1 }) // sort by the date
        .then(posts => {
            if ( posts.length === 0 ) {
                res.status(404).json({ message: 'There are no posts '});
            }

            res.json({
                count: posts.length,
                posts,
                status: "OK"
            });
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

/*
    @route  GET /posts/:post_id
    @desc   Fetch post by its id
    @acess  public
*/
router.get('/:post_id', (req, res) => {
    const ID = req.params.post_id;
    
    if (! ObjectId.isValid(ID) ) {
        return res.status(404).json({message: 'Not found'});
    }

    Post.findById(ID).then(post => {
        if (!post) {
            return res.status(404).json({message: 'Not found'});
        }

        res.json(post);
    }).catch(err => {
        res.status(400).json(err);
    });
});

/*
    @route  DELETE /posts/:post_id
    @desc   delete post by its id
    @acess  private
*/
router.delete('/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findOne({ user: req.user.id })
                .then(post => {
                    //ckeck the owner of the post [User can only delete its post]
                    if (post.user.toString() !== req.user.id) {
                        return res.status(409).json({message: 'User is not authorized'});
                    }

                    // delete
                    post.remove().then( () => {
                        res.json({message: 'Post deleted successfully'});
                    }).catch(err => {
                        res.status(400).json(err);
                    });
                })
                .catch(error => {
                    res.status(400).json({message: 'Post not found'});
                });
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


module.exports = router;
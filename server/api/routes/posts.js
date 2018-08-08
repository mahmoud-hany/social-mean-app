const express = require('express');
const passport = require('passport');
const { ObjectId } = require('mongoose').Types;

const router = express.Router();

// Profile and Post models
const Post = require('../models/post');
const Profile = require('../models/profile');

const validatePostInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment');

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
            if (!profile) {
                return res.status(404).json({message: 'Profile Not found'});
            }

            Post.findOne({ user: req.user.id })
                .then(post => {

                    if (!post) {
                        return res.status(404).json({message: 'Post Not found'});
                    }
        
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
                    res.status(400).json({message: 'Post not found', error});
                });
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

/*
    @route  POST /posts/like/:post_id
    @desc   add or remove like from post
    @acess  private
*/
router.post('/like/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const ID = req.params.post_id;
    
    if (! ObjectId.isValid(ID) ) {
        return res.status(404).json({message: 'Not found'});
    }

    Profile.findOne({user: req.user.id})
        .then( profile => {
            if (!profile) {
                return res.status(404).json({message: 'You should have profile first to like a post'});
            }

            //profile exist
            Post.findById(ID)
                .then(post => {
                    if (!post) {
                        return res.status(404).json({message: 'Post Not found'});
                    }

                    // SO post is exist and user is authenticated
                    
                    //check if the user already like this post or not
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {                     
                        // User Want to add like to This post [ Add user to likes array ]
                        post.likes.unshift({user: req.user.id});
                        //save changes in database
                        post.save()
                            .then(() => {
                                res.json({message: 'Like added successfully'})
                            })
                            .catch(err => res.status(400).json(err));
                    } else {
                        // User Want to remove like from This post [ Add user to likes array ]
                        // get remove index
                        const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
                        
                        //save changes in database
                        post.likes.splice(removeIndex, 1);
                        post.save()
                            .then(() => {
                                res.json({message: 'Like removed successfully'})
                            })
                            .catch(err => res.status(400).json(err));
                         
                    }  

                })
                .catch(error => {
                    res.status(400).json(error);
                });

        })
        .catch(err => {
            res.status(400).json(err);
        });
});

/*
    @route  POST /posts/comment/:post_id
    @desc   add Comment to post
    @acess  private
*/
router.post('/comment/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    //check the id validaity
    const ID = req.params.post_id; 
   
    if (! ObjectId.isValid(ID) ) {
        return res.status(404).json({message: 'Not found'});
    }

    // check inputs fields validatiy
    const { errors, isValid } = validateCommentInput(req.body)
    
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Post.findById(ID)
        .then(post => {
            if (!post) {
                return res.status(404).json({message: 'Not found'});
            }

            const newComment = {
                user: req.user.id,
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
            };
            
            post.comments.unshift(newComment); //add comment to comments array
            post.save()
                .then((post) => {
                    res.json({ message: 'comment added successfully', post});
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

/*
    @route  DELETE /posts/comment/:post_id/:comment_id
    @desc   remove Comment from post
    @acess  private
*/
router.delete(
    '/comment/:post_id/:comment_id', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        const postId = req.params.post_id;
        const commentId = req.params.comment_id;

        //check that post and comment id are real
        if (!ObjectId.isValid(postId) && !ObjectId.isValid(commentId)) {
            return res.status(404).json({message: 'Not found'});
        }

        Post.findById(postId)
            .then(post => {
                if (!post) { //post is not exist
                    return res.status(404).json({message: 'Post Not found'});
                }

                //if the comment not exist 
                if (post.comments.filter(comment => comment._id.toString() === commentId).length === 0) {
                    return res.status(404).json({message: 'Comment Not found'});
                }

                //get index of comment
                const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(commentId);
                
                if (removeIndex === -1) { // comment does't exist
                    return res.status(404).json({message: 'Not found'});
                }

                post.comments.splice(removeIndex, 1);
                post.save().then((post) => {
                    res.json({ message: 'comment removed successfully', post});
                }).catch(err => {
                    res.status(400).json(err);
                });
            })
            .catch(err => {
                res.status(400).json(err);
            }); 
        
})


module.exports = router;
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const tokenKey = require('../../config/keys').tokenKey;

/*
    @route  POST/ users/register
    @desc   Register user
    @acess  Public
*/
router.post('/register', (req, res) => {
    
    User.findOne({email: req.body.email}).then( user => {
        if( user ) {
            return res.status(409).json({
                message: 'E-mail is already exist'
            });
        }
        const avatar = gravatar.url(req.body.email, {
            s: 200, //size
            d: 'mm', //default
            r: 'pg' //rating
        });

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar
        });

        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
                // throw error if unable to the password
                if (err || error) throw err || error;
                
                newUser.password = hashedPassword;
                newUser.save().then(result => {
                    res.json({
                        message: 'Authentication successed',
                        result
                    })
                }).catch(e => {
                    res.status(400).json({
                        message: 'Unable to save the user',
                        e
                    });
                });
            })    
        });
        
    }).catch(err => {
        res.status(400).json({
            message: 'Authentication Faild',
            err
        });
    });

});

/*
    @route  POST/ users/login
    @desc   login user Return JWT token
    @acess  Public
*/
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user => {
        if ( !user ) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
       
       // if the email exist | compare password with the hashed password 
       bcrypt.compare( password, user.password ).then( isMatch => {

            if (isMatch) { // password and email matches
                const userData = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                };
                const token = jwt.sign(userData, tokenKey, { expiresIn: "1h" });

                res.json({
                    message: 'Authentication successed',
                    token: `Bearer ${token}`
                });
            } else {
                res.status(409).json({
                    message: 'Password incorect'
                });
            }
        }).catch(err => {
            res.status(400).json(err);
        });

    }).catch(err => {
        res.status(400).json({
            message: 'Authentication Failed',
            err
        });
    });
});


module.exports = router;
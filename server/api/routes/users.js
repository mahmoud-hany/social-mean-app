const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//validation functions
const registerValidation = require('../../validation/register');
const loginValidation = require('../../validation/login');

const User = require('../models/user');
const tokenKey = require('../../config/keys').tokenKey;

/*
    @route  POST/ users/register
    @desc   Register user
    @acess  Public
*/
router.post('/register', (req, res) => {
    const {isValid, errors} = registerValidation(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}).then( user => {
        if( user ) {
            errors.email = 'E-mail is already exist';
            return res.status(409).json(errors);
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
                newUser.save().then(user => {
                    res.json({
                        message: 'Authentication successed',
                        user
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

    const {isValid, errors} = loginValidation(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

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

            if (isMatch) { // password matches
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
                errors.password = 'Password is incorrect';
                res.status(409).json(errors);
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

/*
    @route  POST/ users/current
    @desc   Return current user
    @acess  private
*/
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        date: req.user.date,
        avatar: req.user.avatar
    });
});

module.exports = router;
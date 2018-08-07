const express = require('express');
const router = express.Router();

const passport = require('passport');

//validation function
const validatProfileInputs = require('../../validation/profile');  

const Profile = require('../models/profile');

//notice that we have user data so we don't need  profile/id
/*
    @route  GET/ profile
    @desc   get user profile
    @acess  private
*/
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id})
        .populate('user', 'name avatar date')
        .then(profile => {
            if (!profile) {
                return res.status(404).json({
                    message: 'User Profile not found'
                });
            }

            res.json(profile);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

/*
    @route  POST/ profile
    @desc   Create or edit user profile
    @acess  private
*/
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const {errors, isVaild} = validatProfileInputs(req.body);

    if (!isVaild) {
        return res.status(400).json(errors);
    }

    const DATA = req.body; // Data coming from the user

    const profileData = {}; // Data that will be added to database

    profileData.user = req.user.id;
    if (DATA.handle) profileData.handle = DATA.handle;
    if (DATA.status) profileData.status = DATA.status;
    if (DATA.company) profileData.company = DATA.company;
    if (DATA.bio) profileData.bio = DATA.bio;
    if (DATA.location) profileData.location = DATA.location;
    if (DATA.githubusername) profileData.githubusername = DATA.githubusername;

    if (typeof DATA.skills !== undefined || typeof DATA.skills !== null ) {
        profileData.skills = DATA.skills.split(','); 
    }

    profileData.social = {}; //social
    if (DATA.youtube) profileData.social.youtube = DATA.youtube;
    if (DATA.facebook) profileData.social.facebook = DATA.facebook;
    if (DATA.linkedin) profileData.social.linkedin = DATA.linkedin;
    if (DATA.twitter) profileData.social.twitter = DATA.twitter;
    if (DATA.instagram) profileData.social.instagram = DATA.instagram;
    if (DATA.github) profileData.social.github = DATA.github;

    Profile.findOne({ user: req.user.id })
        .then( profile => {
            if(profile) { // update the old one
                Profile.findOneAndUpdate({ user: req.user.id }, {$set: profileData}, {new: true})
                    .then(profile => {
                        res.json(profile)
                    })
                    .catch(e => {
                        res.status(400).json({
                            message: 'Unable to update the profile',
                            e
                        })
                    });

            } else { // Create a new profile 
                //check if we have handel => we don't need to have multiple handle cause of SEO
                Profile.findOne({ handle: profileData.handle })
                    .then(profile => {
                        if (profile) {
                            return res.status(400).json({
                                message: 'Handle is already exist'
                            });
                        }

                        //save the profile in the database
                        const newProfile = new Profile(profileData);
                        newProfile.save().then().catch(er => {
                            res.status(400).json({
                                message: 'Unable to save the profile',
                                er
                            })
                        });
                    }).catch( error => {
                        res.status(400).json(error);
                    }) 
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });

});

module.exports = router;
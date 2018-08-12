const express = require('express');
const router = express.Router();

const { ObjectId } = require('mongoose').Types;
const passport = require('passport');

//validation function
const validatProfileInputs = require('../../validation/profile');
const validateExpInputs = require('../../validation/experience');
const validateEducation = require('../../validation/education');

const Profile = require('../models/profile');
const User = require('../models/user');

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
    @route  GET/ profile/handle/:handle
    @desc   get user profile by idA
    @acess  public
*/
router.get('/handle/:handle', (req , res) => {
    const handle = req.params.handle;

    Profile.findOne({handle})
        .populate('user', 'name avatar date')
        .then(profile => {
            if (!profile) {
                return res.status(404).json({
                    message: 'Profile not found'
                });
            }

        res.json(profile);
    }).catch(err => {
        res.status(400).json({message: 'try again', err});
    });
});

/*
    @route  GET/ profile/user/:user_id
    @desc   get user profile by id
    @acess  public
*/
router.get('/user/:user_id', (req , res) => {
    const ID = req.params.user_id;

    if (! ObjectId.isValid(ID) ) {
        return res.status(400).json({
            message: 'Profile not found'
        });
    }

    Profile.findOne({user: ID})
        .populate('user', 'name avatar date')
        .then(profile => {
            if (!profile) {
                return res.status(404).json({
                    message: 'Profile not found'
                });
            }

        res.json(profile);
    }).catch(err => {
        res.status(400).json({message: 'try again', err});
    });
});

/*
    @route  GET/ profile/all
    @desc   get all profiles
    @acess  public
*/
router.get('/all', (req, res) => {
    Profile.find()
        .populate('user', 'name avatar')
        .then(profiles => {
            if (!profiles) {
                return res.status(404).json({message: 'There are no profiles'});
            }

            res.json({
                count: profiles.length,
                profiles
            });
        })
        .catch(err => {
            res.status(400).json({message: 'There are no profiles', err});
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


/*
    @route  DELETE /profile
    @desc   delete profile page
    @acess  private
*/
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const ID = req.user.id;
    Profile.findOneAndRemove({ user: ID})
        .then(() => {
            User.findByIdAndRemove(ID).then(() => {
                res.json({ message: 'Profile and User was deleted Successfully'});
            })
            .catch(error => {
                res.status(400).json(error);
            })
        })
        .catch( err => {
            res.status(400).json(err);
        });
});

/*
    @route  POST/ profile/experience
    @desc   adding experience to user profile
    @acess  private
*/
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validateExpInputs(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then( profile => {
            if (!profile) {
                return res.status(404).json({message: 'Create a profile First to add experiecne'});
            }

            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };
            // add experiece to the experiecne arrray
            profile.experience.unshift(newExp);
            
            // save the profile
            profile.save().then( () => {
                res.json({ message: 'Experience was added successfully'});
            }).catch(er => {
                res.status(400).json({ message: 'Unable to save experience', er });
            });
        }).catch( err => {
            res.status(400).json(err);
        });
       
});



/*
    @route  POST/ profile/education
    @desc   adding education to user profile
    @acess  private
*/
router.post('/education', passport.authenticate('jwt', { session: false } ), (req, res) => {
    const {errors, isValid} = validateEducation(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then( profile => {
        if (!profile) {
            return res.status(404).json({message: 'Create a profile First to add education'})
        }

        const newEducation = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            description: req.body.description,
        };

        // add education to the experiecne arrray
        profile.education.unshift(newEducation);
            
        // save the profile
        profile.save().then( () => {
            res.json({ message: 'Education was added successfully'});
        }).catch(er => {
            res.status(400).json({ message: 'Unable to save education', er });
        });
  
    }).catch( err => {
        res.status(400).json(err);
    });
})


/*
    @route  DELETE /profile/experience/exp_id
    @desc   delete experiecnce from  profile
    @acess  private
*/
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const ID = req.params.exp_id;
    
    if (! ObjectId.isValid(ID) ) {
        return res.status(404).json({message: 'Not found'});
    }

    Profile.findOne({ user: req.user.id })
        .then( profile => {
            if (!profile) {
                return res.status(404).json({message: 'Create a profile First to remove experience'})
            }

            // get the index of the experience 
            const removeIndex = profile.experience.map( item => item.id ).indexOf(ID);
            
            if (removeIndex === -1) { // experience does't exist
                return res.status(404).json({message: 'Not found'});
            }

            // remove it from the array
            profile.experience.splice(removeIndex, 1);

            // save changes
            profile.save()
                .then( profile => res.json(profile) )
                .catch( err => res.status(400).json(err) );

        })
        .catch(err => {
            res.status(400).json(err);
        });
});


/*
    @route  DELETE /profile/education/exp_id
    @desc   delete education from  profile
    @acess  private
*/
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const ID = req.params.edu_id;
    
    if (! ObjectId.isValid(ID) ) {
        return res.status(404).json({message: 'Not found'});
    }

    Profile.findOne({ user: req.user.id })
        .then( profile => {
            if (!profile) {
                return res.status(404).json({message: 'Create a profile First to remove education'})
            }

            // get the index of the education 
            const removeIndex = profile.education.map( item => item.id ).indexOf(ID);
            
            if (removeIndex === -1) { // experience does't exist
                return res.status(404).json({message: 'Not found'});
            }
            
            // remove it from the array
            profile.education.splice(removeIndex, 1);

            // save changes
            profile.save()
                .then( profile => res.json(profile) )
                .catch( err => res.status(400).json(err) );

        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;
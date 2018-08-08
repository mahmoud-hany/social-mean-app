const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    handle: {
        type: String,
        maxlength: 60,
        required: true,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    skills: {
        type: [String], //array
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    bio: { 
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    githubusername: {
        type: String,
        trim: true
    },
    experience: [
       {
            title: {
                type: String,
                required: true,
                trim: true
            },
            company: {
                type: String,
                required: true,
                trim: true
            },
            location: {
                type: String,
                trim: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            currunt: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
       }
    ],
    education: [
        {
            school: {
                type: String,
                required: true,
                trim: true
            },
            degree: {
                type: String,
                required: true,
                trim: true
            },
            fieldofstudy: {
                type: String,
                trim: true
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date
            },
            description: {
                type: String,
                trim: true
            }
        }
    ],
    social: {
        youtube: {
            type: String,
            trim: true
        },
        facebook: {
            type: String,
            trim: true
        },
        linkedin: {
            type: String,
            trim: true
        },
        instagram: {
            type: String,
            trim: true
        },
        github: {
            type: String,
            trim: true
        },
        twitter: {
            type: String,
            trim: true
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    handle: {
        type: String,
        maxlength: 60
    },
    company: {
        type: String
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
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String,
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
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofdescription: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
        github: {
            type: String
        },
        twitter: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
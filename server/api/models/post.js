const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 40
    },
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            } 
        }
    ],
    comments: [
       {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String,
                required: true,
                trim: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now()
            }
       }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
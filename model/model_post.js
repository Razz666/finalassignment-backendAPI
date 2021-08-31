const mongoose = require('mongoose');
const user=require('./model_user');

const post = mongoose.model('Posts', {
    username: {
        type: String,
        required: true,
        ref: user
    },
    postCaption: {
        type: String,
        required: true
    },
    postPhoto: {
        type: String,
        default: ""
    },
    latitude: {
        type: String,
        default: "27.7172"
    },
    longitude: {
        type: String,
        default: "85.3240"
    },
    contact: {
        type: String,
        required: true
    }
})

module.exports = post
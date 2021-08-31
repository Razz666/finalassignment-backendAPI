const mongoose = require('mongoose');
const user = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: "profile.jpg"
    }
})

module.exports = user;
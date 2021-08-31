const mongoose = require('mongoose');

const discussion = mongoose.model('Discussion', {
    admin: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },
    comments: [String]
});

module.exports = discussion;
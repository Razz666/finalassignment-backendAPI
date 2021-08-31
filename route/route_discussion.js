const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const discussion = require('../model/model_discussion');

router.post('/createDiscussion', auth.verifyUser, function(req, res){
    const admin = req.body.admin
    const topic = req.body.topic
    const description = req.body.description

    const newDiscussion = new discussion({ admin: admin, topic: topic, description: description })
    // console.log(newDiscussion)
    newDiscussion.save()
    .then(function (result) {
        res.status(201).json({ message: "Community created" })
    })
    .catch(function (err) {
        res.status(500).json({ message: err })
    })
})

router.get('/getAllDiscussion', auth.verifyUser, function(req, res) {
    discussion.find().then(function (data) {
        res.status(200).json({ success: true, data: data })
    })
    .catch(function(err) {
        res.status(500).json({ success: false, message: err })
    })
})

router.get('/getDiscussion/:id', auth.verifyUser, function (req, res) {
    const id = req.params.id
    // console.log(id)
    discussion.findOne({ _id: id })
        .then(function (data) {
            res.status(200).json(data) 
            // console.log(data)
        }).catch(function (err) {
            res.status(500).json({ message: err })
        })
})

router.put('/addComment', auth.verifyUser, function(req, res) {
    const id = req.body.id
    const comment = req.body.comment

    // console.log(comment)

    discussion.updateOne({_id: id}, {$addToSet: {comments: [comment]}})
    .then(function (result) {
        res.status(200).json({ success: true, message: "Comment added successfully" })
    })
    .catch( function(err) {
        res.status(500).json({ success: false, message: err })
    })
})

module.exports = router;
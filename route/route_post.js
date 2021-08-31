const express = require('express');
const router = express.Router();
const post = require('../model/model_post');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/createPost', auth.verifyUser, upload.single('postPhoto'), function (req, res) {
    if (req.file == undefined) {
        return res.status(400).json({ message: "Invalid file format" })
    }

    const username = req.userData.username
    const postCaption = req.body.postCaption
    // const postPhoto = req.body.postPhoto
    const postPhoto = req.file.filename
    const latitude = req.body.latitude
    const longitude = req.body.longitude
    const contact = req.body.contact

    const myPost = new post({ username: username, postCaption: postCaption,
         postPhoto: postPhoto, latitude: latitude, longitude: longitude, contact: contact });
    myPost.save()
        .then(function (result) {
            res.status(201).json({ success: true, message: "Post added" })
        })
        .catch(function (err) {
            res.status(500).json({ success: false, message: err })
        })
})

router.post('/createAPost', auth.verifyUser, function (req, res) {
    const username = req.userData.username
    const postCaption = req.body.postCaption
    const contact = req.body.contact

    const myPost = new post({ username: username, postCaption: postCaption, contact: contact });
    myPost.save()
        .then(function (result) {
            res.status(201).json({ success: true, message: "Post added", _id: result._id })
        })
        .catch(function (err) {
            res.status(500).json({ success: false, message: err })
        })
})

router.delete('/deletePost/:id', function (req, res) {
    const id = req.params.id
    post.deleteOne({ _id: id })
        .then(function (result) {
            res.status(200).json({ success: true, message: "Post deleted" })
        })
        .catch(function (err) {
            res.status(500).json({ success: false, message: err })
        })
})

router.get('/getAllPost', auth.verifyUser,  function (req, res) {
    post.find().then(function (data) {
       res.status(200).json({ success: true, data: data })
    }).catch(function (err) {
        res.status(500).json({ success: false, message: err })
    })
})

router.get('/getMyPost', auth.verifyUser,  function (req, res) {
    const username = req.userData.username
    post.find({ username: username }).then(function (data) {
       res.status(200).json({ success: true, data: data })
    }).catch(function (err) {
        res.status(500).json({ success: false, message: err })
    })
})

router.get('/getPost/:id', auth.verifyUser, function (req, res) {
    const id = req.params.id
    post.findOne({ _id: id })
        .then(function (data) {
            res.status(200).json({ success: true, post: data }) 
            // console.log(data)
        }).catch(function (err) {
            res.status(500).json({ message: err })
        })
})

router.put('/updatePost', auth.verifyUser, upload.single('postPhoto'), function(req, res) {

    if (req.file == undefined) {
        return res.status(400).json({ message: "Invalid file format" })
    }

    const id = req.body.id
    const postCaption = req.body.postCaption
    const postPhoto = req.file.filename
    const latitude = req.body.latitude
    const longitude = req.body.longitude
    const contact = req.body.contact

    post.updateOne({_id: id}, { postCaption: postCaption, postPhoto: postPhoto, 
        latitude: latitude, longitude: longitude, contact: contact })
    .then(function (result) {
        res.status(200).json({ success: true, message: "Post updated successfully" })
    })
    .catch( function(err) {
        res.status(500).json({ success: false, message: err })
    })
})

router.put('/updateAPost', auth.verifyUser, function(req, res) {

    const id = req.body._id
    const postCaption = req.body.postCaption
    const contact = req.body.contact

    post.updateOne({_id: id}, { postCaption: postCaption, contact: contact })
    .then(function (result) {
        res.status(200).json({ success: true, message: "Post updated successfully" })
    })
    .catch( function(err) {
        res.status(500).json({ success: false, message: err })
    })
})

router.put('/uploadPostPhoto/:_id', auth.verifyUser, upload.single('postPhoto'), function(req, res) {

    if (req.file == undefined) {
        return res.status(400).json({ message: "Invalid file format" })
    }

    const id = req.params._id
    const postPhoto = req.file.filename

    post.updateOne({_id: id}, { postPhoto: postPhoto })
    .then(function (result) {
        res.status(200).json({ success: true, message: "Post updated successfully" })
    })
    .catch( function(err) {
        res.status(500).json({ success: false, message: err })
    })
})

module.exports = router;
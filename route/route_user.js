const express = require('express');
const router = express.Router();
const user = require('../model/model_user');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const jwt = require('jsonwebtoken');

router.post('/createUser', [
    check('username', "Username is required").not().isEmpty(),
    check('email', "Email is required").not().isEmpty(),
    check('email', "Enter valid email").isEmail(),
    check('password', "Password is required").not().isEmpty()
], function (req, res) {
    const validationError = validationResult(req);

    if (validationError.isEmpty()) {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        bcryptjs.hash(password, 10, function (err, hash) {
            const me = new user({ username: username, email: email, password: hash })

            me.save()
                .then(function () {
                    res.status(201).json({ success: true, message: "Registered!!" })
                })
                .catch(function () {
                    res.status(500).json({ success: false, message: err })
                })
        })
    }
    else {
        res.status(400).json(validationError.array())
    }
})

router.post('/login', function (req, res) {
    const username = req.body.username
    const password = req.body.password

    user.findOne({ username: username })
        .then(function (clientData) {
            if (clientData === null) {
                return res.status(403).json({ success: false, message: "No such user exists" })
            }

            bcryptjs.compare(password, clientData.password, function (err, result) {
                if (result === false) {
                    return res.status(403).json({ success: false, message: "Invalid credentials" })
                }
                const token = jwt.sign({ userId: clientData._id }, 'Sercretkey');
                res.status(200).json({ success: true, token: token, clientData: clientData })
            })
        })
        .catch(function (err) {
            res.status(500).json({ message: err })
        })
})

router.get('/getMe', auth.verifyUser, function(req, res){
    const id = req.userData._id
    user.findOne({ _id: id })
    .then( function(me) {
        res.status(200).json({ success: true, me: me })
    })
    .catch(function (err) {
        res.status(500).json({ error: err })
    })
})

router.put('/updateUser', auth.verifyUser, upload.single('profileImage'), function (req, res) {

    if (req.file == undefined) {
        return res.status(400).json({ message: "Invalid file format" })
    }

    const id = req.userData._id;
    const username = req.userData.username;
    const email = req.userData.email;
    const profileImage = req.file.filename;

    user.updateOne({ _id: id }, { username: username, email: email, profileImage: profileImage })
        .then(function (result) {
            res.status(200).json({ success: true, message: "Updated" })
        })
        .catch(function (err) {
            res.status(500).json({ success: false, error: err })
        })
})

module.exports = router
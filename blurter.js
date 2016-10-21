/**
 * Teemu Tuomela
 * Node.js Backend example
 * 
 * JAMK-IT
 * TTOW0610 Mobile Application Development
 * 
 * Created: 17.10.2016
 */

// Use dotenv module to set up environment variables from .env file.
require('dotenv').config();

const express = require('express');
const router = express.Router();

// Use fcm-node to send notifications.
const FCM = require('fcm-node');
const fcm = new FCM(process.env.FIREBASE_SERVER_KEY);

// Mongoose is a module used to communicate with MongoDB.
const mongoose = require('mongoose');
const mongodburi = process.env.MONGODB_URI;
mongoose.connect(mongodburi);

// Require the models for our resources.
const Blurt = require('./Models/blurt');
const Comment = require('./Models/comment');

router.get('/blurts', function(req, res) {
    Blurt
    .find()
    .sort({date: 'desc'})
    .exec(function(err, blurts) {
        if (err)
            res.send(err);
        res.json(blurts);
    });
});

router.post('/blurts', function(req, res) {
    const blurt = new Blurt();
    blurt.name = req.body.name;
    blurt.date = new Date();
    blurt.content = req.body.content;
    blurt.save(function(err) {
        if (err)
            res.send(err);
        
        // Let's send a notification
        const message = {
            to: '/topics/general',
            priority: 'high',
            notification: {
                body: 'A new Blurt has just been posted!',
                sound: 'default'
            }
        };

        fcm.send(message, function(err, response) {
            if (err)
                console.log("Failed to send notification!", err);
            else
                console.log("Sent notification: ", response);
        });

        res.json(blurt);
    });
});

// Define routes.
// router.route('/blurts')
//     // Get all Blurts.
//     .get(function(req, res) {
//         Blurt
//         .find()
//         .sort({date: 'desc'})
//         .exec(function(err, blurts) {
//             if (err)
//                 res.send(err);
//             res.json(blurts);
//         });
//     })
//     // Create a new Blurt.
//     .post(function(req, res) {
//         const blurt = new Blurt();
//         blurt.name = req.body.name;
//         blurt.date = new Date();
//         blurt.content = req.body.content;
//         blurt.votes = 0;
//         blurt.save(function(err) {
//             if (err)
//                 res.send(err);
            
//             // Let's send a notification
//             const message = {
//                 to: '/topics/general',
//                 priority: 'high',
//                 notification: {
//                     body: 'A new Blurt has just been posted!',
//                     sound: 'default'
//                 }
//             };

//             fcm.send(message, function(err, response) {
//                 if (err)
//                     console.log("Failed to send notification!", err);
//                 else
//                     console.log("Sent notification: ", response);
//             });

//             res.json(blurt);
//         });
//     });

router.post('/comments', function(req, res) {
    const comment = new Comment();
    comment.target = req.body.target;
    comment.date = new Date();
    comment.content = req.body.content;
    comment.save(function(err) {
        if (err)
            res.send(err);
        res.json(comment);
    });
});

router.get('/blurts/:id/comments', function(req, res) {
    Comment
    .find({target: req.params.id})
    .sort({date: 'desc'})
    .exec(function(err, comments) {
        if (err)
            res.send(err);
        res.json(comments);
    });
});

module.exports = router;

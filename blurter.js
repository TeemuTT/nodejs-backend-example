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

// Mondoose is a module used to communicate with MongoDB.
const mongoose = require('mongoose');
const mongodburi = process.env.MONGODB_URI;
mongoose.connect(mongodburi);

const Blurt = require('./Models/blurt');

router.route('/blurts')
    // Get all Blurts.
    .get(function(req, res) {
        Blurt.find().sort({date: 'desc'}).exec(function(err, blurts) {
            if (err)
                res.send(err);
            res.json(blurts);
        });
    })
    // Create a new Blurt.
    .post(function(req, res) {
        const blurt = new Blurt();
        blurt.name = req.body.name;
        blurt.date = new Date();
        blurt.content = req.body.content;
        blurt.votes = 0;
        blurt.save(function(err) {
            if (err)
                res.send(err);
            res.json(blurt);
        });
    });


const Comment = require('./Models/comment');

router.route('/comments')
    // Create a comment.
    .post(function(req, res) {
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

router.route('/blurts/:id/comments')
    // Get comments of a specific Blurt.
    .get(function(req, res) {
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

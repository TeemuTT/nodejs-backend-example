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
    // Get all blurts.
    .get(function(req, res) {
        Blurt.find(function(err, blurts) {
            if (err)
                res.send(err);
            res.json(blurts);
        });
    })
    // Create a new blurt.
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

module.exports = router;

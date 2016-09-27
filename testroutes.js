/**
 * Teemu Tuomela
 * Node.js Backend example
 * 
 * JAMK-IT
 * TTOW0610 Mobile Application Development
 * 
 * 27.9.2016
 */

const express = require('express');
const router = express.Router();

router.route('/hello')
    .get(function(req, res) {
        const response =
        {
            "from": "server",
            "message": "hello"
        };
        res.json(response);
    });

module.exports = router;

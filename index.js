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
const app = express();

const testroutes = require('./testroutes');

app.use('/testroutes', testroutes);

app.listen(5000, function() {
    console.log('Server running');
});

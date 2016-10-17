/**
 * Teemu Tuomela
 * Node.js Backend example
 * 
 * JAMK-IT
 * TTOW0610 Mobile Application Development
 * 
 * Created: 27.9.2016
 * Modified: 17.10.2016
 */

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const testroutes = require('./testroutes');
app.use('/testroutes', testroutes);

// Load our blurter module and attach it to a route.
const blurter = require('./blurter');
app.use('/api', blurter);

const port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Server running on port', port);
});

/**
 * Teemu Tuomela
 * Node.js Backend example
 * 
 * JAMK-IT
 * TTOW0610 Mobile Application Development
 * 
 * Created: 17.10.2016
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlurtSchema = new Schema({
    name: String,
    date: Date,
    content: String,
    votes: Number
});

module.exports = mongoose.model('Blurt', BlurtSchema);

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

const CommentSchema = new Schema({
    target: Schema.Types.ObjectId,
    date: Date,
    content: String
});

module.exports = mongoose.model('Comment', CommentSchema);

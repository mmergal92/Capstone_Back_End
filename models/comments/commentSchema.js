const mongoose = require('mongoose');

const UserCommentSchema = new mongoose.Schema({
    comment: String,
    date: String,
    profilepic: String,
    username: String,
},{timestamps: true} );

const userComment = mongoose.model('userComment', UserCommentSchema, 'UserComments');

module.exports = userComment;

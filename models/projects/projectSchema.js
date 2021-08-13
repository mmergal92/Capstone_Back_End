const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    client: String,
    status: String,
    dateUploaded: String,
    dueDate: String,
    clientToDo: Array,
    username: String,
    onTrack: Boolean, 
    approved: Boolean,
    notes: String,
    version: Number, 
},{timestamps: true} );

const projectOverview = mongoose.model('projectOverview', projectSchema, 'ProjectOverviews');

module.exports = projectOverview;

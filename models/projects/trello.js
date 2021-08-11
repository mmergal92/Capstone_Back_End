const mongoose = require('mongoose');

const trelloDataSchema = new mongoose.Schema({
    id: String,
    description: String,
    title: String, 
    dueDate: String,
    list: String,
    board: String,
    completed: Boolean,
    shortUrl: String
}, );

const trelloData = mongoose.model('trelloData', trelloDataSchema);

module.exports = trelloData;
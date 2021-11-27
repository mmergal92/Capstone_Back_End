const mongoose = require('mongoose');

const UserInquirySchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    website_url: String,
    business_name: String,
    business_services: String,
    services_interest: String,
    timeline_project: String,
    start_date: String,
    decisions: Number,
},{timestamps: true} );

const userInquiry = mongoose.model('userInquiry', UserInquirySchema);

module.exports = userInquiry;

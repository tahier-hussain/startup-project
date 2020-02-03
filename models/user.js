const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    img: { 
        data: Buffer, 
        contentType: String 
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: false,
        default: null,
        unique: true
    },
    website_link: {
        type: String,
        required: false,
        default: null,
        unique: true
    },
    status: {
        type: String
    },
    location: {
        type: String,
        default: null,
        required: false
    },
    phone_no: {
        type: String,
        default: null,
        required: false
    },
    description: {
        type: String,
        default: null,
        required: false
    },
    company_started_date: {
        type: String,
        default: null,
        required: false
    },
    amount_invested: {
        type: String,
        default: null,
        required: false
    },
    revenue_generated: {
        type: String,
        default: null,
        required: false
    },
    offer: {
        type: String,
        default: null,
        required: false
    },
    major_people: [{
        name: {
            type: String
        },
        role: {
            type: String
        },
        linkedin_profile: {
            type: String
        }
    }],
    experience_in_investment: [{
        company_name: {
            type: String
        },
        brief_text: {
            type: String
        }
    }],
    certification: [{
        certificate: {
            type: String
        },
        brief_text: {
            type: String
        }
    }],
    educational_details: [{
        institution_name: {
            type: String
        },
        type: {
            type: String
        }
    }],
    endorsement: [{
        name: {
            type: String
        },
        comment: {
            type: String
        }
    }],
    register_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//User model
const User = require('../../models/user');

// access private
// GET api/auth/user
router.get('/one', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

//Update particular fields
router.post('/update', auth, (req, res) => {
    const id = req.body.id
    
    const obj = {}

    if(req.body.name) {
        obj.name = req.body.name
    }
    if(req.body.email) {
        obj.email = req.body.email
    }
    if(req.body.password) {
        obj.password = req.body.password
    }
    if(req.body.company_name) {
        obj.company_name = req.body.company_name
    }
    if(req.body.website_link) {
        obj.website_link = req.body.website_link
    }
    if(req.body.location) {
        obj.location = req.body.location
    }
    if(req.body.phone_no) {
        obj.phone_no = req.body.phone_no
    }
    if(req.body.description) {
        obj.description = req.body.description
    }
    if(req.body.company_started_date) {
        obj.company_started_date = req.body.company_started_date
    }
    if(req.body.amount_invested) {
        obj.amount_invested = req.body.amount_invested
    }
    if(req.body.revenue_generated) {
        obj.revenue_generated = req.body.revenue_generated
    }
    if(req.body.offer) {
        obj.offer = req.body.offer
    }
    if(req.body.major_people) {
        obj.major_people = req.body.major_people
    }
    if(req.body.endorsement) {
        obj.endorsement = req.body.endorsement
    }

    User.findByIdAndUpdate(id, obj)
    .then(startup => res.json(startup))
    .catch(err => res.status(400).json({ Success : false }))
});

module.exports = router;
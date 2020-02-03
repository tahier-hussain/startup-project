const express = require('express');
const router = express.Router();

//User model
const User = require('../../models/user');

//Startups list
router.get('/startups-list', (req, res) => {
    User.find({ 'role' : 'startup' })
        .find({ 'status': 'Approved' })
        .sort({ date: -1})
        .then(users => res.json(users));
});

//Stakeholders list
router.get('/stakeholders-list', (req, res) => {
    User.find({ 'role' : 'stakeholder' })
        .find({ 'status': 'Approved' })
        .sort({ date: -1})
        .then(stakeholders => res.json(stakeholders));
});

//Mentors list
router.get('/mentors-list', (req, res) => {
    User.find({ 'role' : 'mentor' })
        .find({ 'status': 'Approved' })
        .sort({ date: -1})
        .then(mentors => res.json(mentors));
});

//Managers list
router.get('/list', (req, res) => {
    User.find({ 'role' : 'manager' })
        .find({ 'status': 'Approved' })
        .sort({ date: -1})
        .then(managers => res.json(managers));
})

//List of profiles not yet approved
router.get('/not-approved', (req, res) => {
    User.find({ role: { $ne: 'manager' }})
        .find({status: { $ne: 'Approved' }})
        .find({ $or:[ {'role':'startup'}, {'role':'stakeholder'}, {'role':'mentor'} ]})
        .sort({ date: -1})
        .then(users => res.json(users));
})

module.exports = router;
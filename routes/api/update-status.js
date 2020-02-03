const express = require('express');
const router = express.Router();

//User model
const User = require('../../models/user');

//Update status
router.put('/', (req, res) => {
    var id = req.body.id;
    var obj = {
        status: req.body.status
    }
    User
        .findByIdAndUpdate(id, obj)
        .then(() => res.json({ Success: true }))
        .catch(err => res.status(400).json({ Success: false }))
})
//hello123

module.exports = router;    
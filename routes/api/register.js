const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User model
const User = require('../../models/user');

//Common register for all three roles
router.post('/', (req, res) => {
    const { name, email, role, password, status } = req.body;

    //Simple validation
    if(!name || !email || !role || !password) {
        return res.status(400).json({ msg: 'Please enter all the fields '});
    }
    //Check for existing user
    User
        .findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User already exists '});

            const newUser = new User({
                name,
                email,
                password,
                role,
                status
            });

            if(newUser.role == 'manager') {
                newUser.status = "Approved"
            }
            else {
                newUser.status = "Not Yet Approved";
            }

            //Create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        users: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                            role: user.role,
                                            status: user.status
                                        }
                                    });
                                }
                            )
                        }
                    );
                })
            })
        })
    });

module.exports = router;
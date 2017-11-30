const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');

// protected route - Authentication required

router.get('/me', function(req, res, next) {
  User.findOne({_id: req.user.id}, '-password', function(err, user) {
    if (user) console.log(user.profile);
    if (err) res.status(500).send(err);
    if (!user) res.status(404).send({message: 'no user found'})
    if (user) res.send(user.profile);
  })
});

module.exports = router;

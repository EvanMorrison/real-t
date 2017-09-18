const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Case = require('../models/case.model');
const Contact = require('../models/contact.model');
const Organization = require('../models/organization.model');

// Route requires authentication

router.get('/all', function(req, res) {
  Case.find({})
  .populate('client oppositeParty')
  .populate('client.organization')
  .exec()
  .then(result => {
    res.json(result)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

router.get('/:id', (req, res) => {
  Case.findById(req.params.id)
  .populate('client oppositeParty')
  .exec()
  .then(result => {
    res.json(result)
  })
  .catch(err => res.json(err))
})

router.get('/contact/:id', (req, res) => {
  Contact.findById(req.params.id)
  .populate('organization')
  .exec()
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.post('/new', function(req, res) {
  let newCase = new Case(req.body);
  let party1 = new Contact(req.body.client);
  let party2 = new Contact(req.body.oppositeParty);
  let org1 = new Organization(req.body.client.organization);
  let org2 = new Organization(req.body.oppositeParty.organization);
  org1.save()
  .then(savedOrg1 => {
    party1.organization = savedOrg1;
    party1.save()
    .then(savedParty1 => {
      newCase.client = savedParty1;
      org2.save()
      .then(savedOrg2 => {
        party2.organization = savedOrg2;
        party2.save()
        .then(savedParty2 => {
          newCase.oppositeParty = savedParty2;
          newCase.save()
          .then(savedCase => {
            res.json(savedCase)
          })
      })
    })
  })
})
.catch(err => res.status(500).json(err)) 
});

router.delete('/:id', (req, res) => {
  Case.findByIdAndRemove(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err));
})

module.exports = router;
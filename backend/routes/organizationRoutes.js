const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Person = require('../models/person.model');
const Organization = require('../models/organization.model');
const Case = require('../models/case.model');

// Route requires authentication

router.get('/all', (req, res) => {
  Organization.find({})
  .then(() => res.json(result))
  .catch(err => res.status(500).json(err))
})

router.post('/new', (req, res) => {
  console.log('posting new organization')
  let newOrg = new Organization(req.body.organization);
  let caseId = req.body.caseId;
  let role = req.body.role; // expect 'clientOrg' or 'opoositePartyOrg'
  let personId = req.body.personId;
  newOrg.save()
  .then(savedOrg => {
    if (caseId && role) {
      Case.findByIdAndUpdate(caseId, { [role] : savedOrg }, { new: true}, (err, result) => {
        if (err) res.status(500).json(err);
      })
    }
    if (personId) {
      Person.findByIdAndUpdate(personId, { organization: savedOrg }, { new: true }, (err, result) => {
        if (err) res.status(500).json(err);
        res.json(savedOrg)
      } )
      
    }
    res.json(savedOrg);
  })
  .catch(err => res.status(500).json(err));
})

module.exports = router;

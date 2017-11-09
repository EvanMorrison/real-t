const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Person = require('../models/person.model');
const Organization = require('../models/organization.model');
const Case = require('../models/case.model');

// Route requires authentication

router.get('/all', (req, res) => {
  Person.find({})
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

router.post('/new', (req, res) => {
  console.log('posting new person')
  let newPerson = new Person(req.body.person);
  let caseId = req.body.caseId;
  let role = req.body.role; // expect 'clientContact', 'clientAtty', 'oppositePartyPerson', 'oppositePartyAtty'
  newPerson.save()
  .then(savedPerson => {
    if (caseId && role) {
      Case.findByIdAndUpdate(caseId, { [role] : savedPerson }, { new: true})
      .then(updatedCase => {
        res.json(savedPerson)
      })
      .catch(err => res.status(500).json(err));
    }
    else res.json(savedPerson);
  })
  .catch(err => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
  Person.findByIdAndUpdate({ _id: req.params.id}, req.body, {new: true}, (err, result) => {
    if (err) res.status(500).send(err);
    else {
      res.json(result);
    }
  })
  
})

module.exports = router;

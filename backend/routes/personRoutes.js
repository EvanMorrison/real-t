const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Person = require('../models/person.model');
const Case = require('../models/case.model');

// Route requires authentication

router.get('/all', (req, res) => {
  Person.find({})
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

// retrieves and combines into single array, all org/trust names, 
// and all individual names that aren't associated with an org or trust
router.get('/names', (req, res) => {
  Person.find({}, 'fullOrgName')
  .where('type').in(['organization', 'trust'])
  .then(result1 => {
    Person.find({}, 'displayName')
    .where('type').in(['individual', 'attorney'])
    .then(result2 => {
      let result = result1.concat(result2);
      res.json(result);
    })
  })
  .catch(err => res.status(500).json(err));
})

router.get('/:id', (req, res) => {
  Person.findById(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

router.post('/new', (req, res) => {
  let person = new Person(req.body);
  person.save()
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
  Person.findByIdAndUpdate(req.params.id, req.body, {new: true} )
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

router.delete('/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

module.exports = router;

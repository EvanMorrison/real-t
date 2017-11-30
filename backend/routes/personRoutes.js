const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { Person, Attorney, OtherParty } = require('../models/person.model');

// Route requires authentication

router.get('/', (req, res) => {
  Person.find({})
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

// retrieves and combines into single array, all org, trust, and individual's names
// excluding attorneys.
router.get('/names/principals', (req, res) => {
  Person.find({}, 'fullOrgName fullName shortName lastName')
  .where('kind').in((req.query.type))
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})


router.get('/:id', (req, res) => {
  Person.findById(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

router.post('/', (req, res) => {
  let person = new Person(req.body);
  person.save()
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

router.post('/attorney', (req, res) => {
  let attorney = new Attorney(req.body);
  attorney.save()
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

router.post('/otherparty', (req, res) => {
  let party = new OtherParty(req.body);
  party.save()
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
  Person.findByIdAndUpdate(req.params.id, req.body, {new: true, upsert:true} )
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

router.delete('/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Property = require('../models/property.model');

// Route requires authentication

router.get('/', (req, res) => {
  Property.find({})
  .then(() => res.json(result))
  .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
  Property.findById(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

router.post('/', (req, res) => {
  let newProperty = new Property(req.body);
  newProperty.save()
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
  Property.findByIdAndUpdate(req.params.id, req.body, {new: true, upsert: true })
  .then(result => res.json(result))
  .catch(err =>  res.status(500).send(err));
});

router.delete('/:id', (req, res) => {
  Property.findByIdAndRemove(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

module.exports = router;

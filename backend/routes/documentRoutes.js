const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Documents = require('../models/documents.model');

// Route requires authentication

router.get('/', (req, res) => {
  Documents.find({})
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
  Documents.findById(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err))
})

router.post('/', (req, res) => {
  let newDocuments = new Documents(req.body);
  newDocuments.save()
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
  Documents.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert:true })
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

router.delete('/:id', (req,res) => {
  Documents.findByIdAndRemove(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

module.exports = router;

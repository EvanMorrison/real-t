const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Documents = require('../models/documents.model');
const Case = require('../models/case.model');

// Route requires authentication

router.get('/all', (req, res) => {
  Documents.find({})
  .then(() => res.json(result))
  .catch(err => res.status(500).json(err))
})

router.post('/new', (req, res) => {
  console.log('posting new documents')
  let newDocuments = new Documents(req.body.documents);
  let caseId = req.body.caseId;
  newDocuments.save()
  .then(savedDocuments => {
    if (caseId) {
      Case.findByIdAndUpdate(caseId, { documents : savedDocuments }, { new: true})
      .then(updatedCase => {
        res.json(savedDocuments)
      })
      .catch(err => res.status(500).json(err));
    }
    else res.json(savedDocuments);
  })
  .catch(err => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
  Documents.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(updatedResult => res.json(updatedResult))
  .catch(err => res.status(500).json(err));
})

module.exports = router;

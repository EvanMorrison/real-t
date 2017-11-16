const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Property = require('../models/property.model');
const Case = require('../models/case.model');

// Route requires authentication

router.get('/', (req, res) => {
  Property.find({})
  .then(() => res.json(result))
  .catch(err => res.status(500).json(err))
})

router.post('/', (req, res) => {
  console.log('posting new property')
  let newProperty = new Property(req.body.property);
  let caseId = req.body.caseId;
  newProperty.save()
  .then(savedProperty => {
    if (caseId) {
      Case.findByIdAndUpdate(caseId, { property : savedProperty }, { new: true})
      .then(updatedCase => {
        res.json(savedProperty)
      })
      .catch(err => res.status(500).json(err));
    }
    else res.json(savedProperty);
  })
  .catch(err => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
  Property.findByIdAndUpdate({ _id: req.params.id}, req.body, {new: true}, (err, result) => {
    if (err) res.status(500).send(err);
    else {
      res.json(result);
    }
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Loan = require('../models/loan.model');
const Case = require('../models/case.model');

// Route requires authentication

router.get('/all', (req, res) => {
  Documents.find({})
  .then(() => res.json(result))
  .catch(err => res.status(500).json(err))
})

router.post('/new', (req, res) => {
  console.log('posting new loan')
  let newLoan = new Loan(req.body.loan);
  let caseId = req.body.caseId;
  newLoan.save()
  .then(savedLoan => {
    if (caseId) {
      Case.findByIdAndUpdate(caseId, { loan : savedLoan }, { new: true})
      .then(updatedCase => {
        res.json(savedLoan)
      })
      .catch(err => res.status(500).json(err));
    }
    else res.json(savedLoan);
  })
  .catch(err => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
  Loan.findByIdAndUpdate({ _id: req.params.id}, req.body, {new: true}, (err, result) => {
    if (err) res.status(500).send(err);
    else {
      res.json(result);
    }
  })
});

module.exports = router;

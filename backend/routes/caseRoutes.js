const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Case = require('../models/case.model');

// Route requires authentication

// get all cases in the database without any populating of ref documents
router.get('/', (req, res) => {
  Case.find()
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})

// get all cases but return only selected fields and populating a particular subset of ref documents
router.get('/lightlist', (req, res) => {
  Case.find({}, { caseNum: 1, lender: {$slice: 1}, borrower: {$slice: 1}, property: {$slice:1}, 
                  "loan.originalPrincipalAmount": 1,  "saleInfo.projectedSaleDate": 1})
  .populate('lender borrower', 'type displayName orgDisplayName address1 address2 city state zip phones emails')
  .populate('property', '-legalDescription')
  .exec()
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err))
})

// get all cases, populating all refs from other collections
router.get('/fulllist', (req, res) => {
  Case.find({})
  .populate('lender lenderAttorney borrower borrowerAttorney otherParties')
  .populate('property documents')
  .exec()
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err))
})

// a complete list of all casenumbers with case_ids
router.get('/casenum/list', (req, res) => {
  Case.find({}, { caseNum : 1 })
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err))
})

// get 1 case by id and fully populate all subdocuments
router.get('/:id', (req, res) => {
  Case.findOne({ _id: req.params.id })
  .populate('lender lenderAttorney borrower borrowerAttorney otherParties')
  .populate('property documents')
  .exec()
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err))
})



// get 1 case by its caseNum property and populate all subdocuments
router.get('/casenum/:id', (req, res) => {
  Case.findOne({ 'caseNum': req.params.id })
  .populate('lender lenderAttorney borrower borrowerAttorney otherParties')
  .populate('property documents')
  .exec()
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err))
})

router.post('/', (req, res) => {
  let newCase = new Case(req.body);
  newCase.setCaseNum((err, result) => {
    if (err) res.status(500).json(err);
    newCase.save()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
  })
})

// update a section of the case, eg. 'lender', 'property', or 'loan'
router.put('/:id/:section', (req, res) => {
  let _id = req.params.id, section = req.params.section;
  let operation = {}, isRefDoc = false;
  if (/^lender|^borrower|^other|^property/.test(section)) {
    isRefDoc = true;
    operation = { $addToSet: { [section]: req.body._id || req.body } }
  } else operation = { $set: {[section]: req.body }}
  if (section === 'documents') isRefDoc = true;
  Case.findByIdAndUpdate(_id, operation, {new: true})
  .select(section)
  .populate((isRefDoc ? section : ' '))
  .exec()
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
})


// delete a profile from a person or property array
router.delete('/:caseId/:section/:profileId', (req, res) => {
  Case.findByIdAndUpdate(req.params.caseId, {
    $pull: { [req.params.section]: req.params.profileId }
  }, {new: true})
  .populate('lender lenderAttorney borrower borrowerAttorney otherParties')
  .populate('property documents tasks status')
  .exec()
  .then(result => res.json(result))
  .catch(err => res.status(500).send(err));
})

// delete a case entirely
router.delete('/:id', (req, res) => {
  Case.findByIdAndRemove(req.params.id)
  .then(result => res.json(result))
  .catch(err => {
    console.log('error: ', err)
    res.status(500).json(err);
  });
});

module.exports = router;
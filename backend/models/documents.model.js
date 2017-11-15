// DOCUMENTS MODEL:

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const documentsSchema = new mongoose.Schema({
  trustDeed: {
    dated: { type: Date },
    ob: { type: String, alias: 'originalBeneficiary' },
    cb: { type: String, alias: 'currentBeneficiary' },
    otee: { type: String, alias: 'originalTrustee' }, 
    ctee: { type: String, alias: 'currentTrustee' },
    istrustorSameAsBorrower: Boolean,
    trustor: String, // usually same as borrower
    isAmountSameAsLoan: Boolean,
    amount: Number, // usually same as loan amount
    recDate: Date,
    entryNo: String,
    county: String
  },
  assignmentTD: [{
    assignor: String,
    assignee: String,
    recDate: Date,
    entryNo: String,
    _id: false
  }],
  substitutionTrustee: [{
    priorTrustee: String,
    newTrustee: String,
    recDate: Date,
    entryNo: String,
    _id: false
  }],
  noticeDefault: [{
    trustee: String,
    recDate: Date,
    entryNo: String,
    _id: false
  }],
  vestingDeed: [{
    grantor: String,
    grantee: String,
    docTitle: String,
    recDate: Date,
    entryNo: String,
    includesAllProperty: Boolean,
    _id: false
  }],
  noticeSale: [{
    saleDate: Date,
    location: String,
    publishDate: Date,
    publication: String,
    mailedAt: Date
  }],
  other: [{
    title: String,
    party1: String,
    party2: String,
    dated: Date,
    entryNo: String,
    recDate: Date,
    description: String,
    includesAllProperty: Boolean,
    _id: false
  }]
}, 
{ minimize: false, 
  timestamps: true,
  setDefaultsOnInsert: true,
  toObject: { retainKeyOrder: true } })


module.exports = mongoose.model('Documents', documentsSchema);

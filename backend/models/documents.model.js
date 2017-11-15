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
  },
  assignmentTD: [{
    assignor: String,
    assignee: String,
    recDate: Date,
    entryNo: String
  }],
  substitutionTrustee: [{
    priorTrustee: String,
    newTrustee: String,
    recDate: Date,
    entryNo: String
  }],
  noticeDefault: [{
    trustee: String,
    recDate: Date,
    entryNo: String
  }],
  vestingDeed: [{
    grantor: String,
    grantee: String,
    type: String,
    recDate: Date,
    entryNo: String
  }],
  noticeSale: {
    saleDate: Date,
    location: String,
    openingBid: Number,
    publishDates: [Date],
    publication: String,
    mailedAt: Date
  },
  noticeIRS: {
    sentDate: Date
  },
  other: [{
    title: String,
    party1: String,
    party2: String,
    dated: Date,
    entryNo: String,
    recDate: Date,
    description: String // 
  }]
})


module.exports = mongoose.model('Documents', documentsSchema);

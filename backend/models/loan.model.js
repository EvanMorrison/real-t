// LOAN MODEL:

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const loanSchema = new mongoose.Schema({
    lender: String,
    borrower: String,
    loanDate: Date,
    initialPrincipal: Number,
    interestRate: Number,
    paymentAmount: Number,
    finalPaymentAmount: Number,
    maturityDate: Date,
    currentPrincipal: {
      amount: Number,
      asOf: Date
    },
    delinquencyDate: Date,
    defaultInterestRate: Number,
    pastDue: {
      pAndI: Number,
      lateFees: Number,
      costs: Number,
      amount: Number,
      asOf: Date
    },
    status: {
      type: String,
      enum: ['repayment', 'forebearance', 'default', 'workout', 'foreclosure']
    }

    
})

module.exports = mongoose.model('Loan', loanSchema);

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
    finalPaymentDate: Date,
    currentPrincipal: {
      amount: Number,
      asOf: Date
    },
    delinquencyDate: Date,
    defaultInterestRate: Number,
    pastDueAmount: {
      value: Number,
      asOf: Date
    },
    status: {
      type: Enumerator,
      value: ['repayment', 'forebearance', 'default']
    }

    
})

module.exports = mongoose.model('Loan', loanSchema);

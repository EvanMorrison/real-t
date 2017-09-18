// CASE MODEL: The collection of people, property, etc. that constitute a distinct case, project, matter, loan, etc.
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const caseSchema = new mongoose.Schema({
  caseNum: Number,
  client: {
    type: ObjectId, ref: 'Person'
  },
  clientContact: { type: Number, default: 0},
  oppositeParty: [{
    type: ObjectId, ref: 'Person' // person/org id
  }],
  loan: {
    type: ObjectId, ref: 'Loan'
  },
  property: {
    profile: { type: ObjectId },
    currentOwnerName: String,
    ownerOccupied: Boolean,
  },
  documents: { type: ObjectId, ref: 'Document' },
  tasks: [
    {
      taskName: String,
      taskDescription: String,
      dueDate: Date
    }
  ],
  status: [
    {
      status: String,
      createdAt: Date,
      createdBy: { type: ObjectId, ref: 'User'}, // User Id
      updatedAt: Date
    }
  ]
},
// Options
{ timestamps: true })

module.exports = mongoose.model('Case', caseSchema);

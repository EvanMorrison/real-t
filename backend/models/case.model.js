// CASE MODEL: The collection of people, property, etc. that constitute a distinct case, project, matter, loan, etc.
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;



const caseSchema = new mongoose.Schema({
  caseNum: String,
  clientContact: { type: ObjectId, ref: 'Person' },
  clientOrg: { type: ObjectId, ref: 'Organization'},
  clientAtty: { type: ObjectId, ref: 'Person'}, // outside counsel for client
  borrowerType: { type: String, enum: ['natural person', 'business organization'] },
  borrowerContact: { type: ObjectId, ref: 'Person' },
  borrowerOrg: { type: ObjectId, ref: 'Organization' },
  borrowerAtty: { type: ObjectId, ref: 'Person'},
  loan: {
    type: ObjectId, ref: 'Loan'
  },
  property: { type: ObjectId, ref: 'Property' },
  currentOwnerName: String,
  isOwnerOccupied: Boolean,
  documents: { type: ObjectId, ref: 'Documents' },
  noticeAddresses: [
    { recipient: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      zip: String
    }
  ],
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


// schema for separate collection that stores case number counter
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true, default:'caseNum' }, 
  seq: { type: Number, default: 0 }, // the sequential counter for case numbers
  lastUpdateAt: Date
}, { collection: 'counter' })
// increments and returns case number sequence, resetting it to zero at the start of each year
counterSchema.methods.nextCaseNum = function(cb) {
  let updates = { $set: { lastUpdateAt: new Date() }};
  if (this.lastUpdateAt.getFullYear() < new Date().getFullYear()) {
    updates.$set = updates.$set + ', seq: 0'; // reset counter to zero each year
  } else {
    updates.$inc = { seq: 1 }
  }
  return this.update(updates, (err) => {
    if (err) return cb(err)
    return cb(null, this.seq);
  })
}
const Counter = mongoose.model('counter', counterSchema);


// methods
// set the unique case number for a new case.
caseSchema.methods.setCaseNum = function(cb) {
  Counter.findById('caseNum') // only document in collection
  .then(counter => {
      counter.nextCaseNum((err, caseNum) => {
        if (err) return cb(err);
        caseNum = ('000' + caseNum).slice(-4);
        let now = new Date();
        let yr = now.getFullYear()-2000;
        let month = ('0' + (now.getMonth() + 1)).slice(-2);
        caseNum = yr + '-' + month + caseNum;
        this.caseNum = caseNum;
        return cb(null, caseNum);
      })
  })
  .catch(err => cb(err))
}


module.exports = mongoose.model('Case', caseSchema);

// PERSON MODEL:

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const contactSchema = new mongoose.Schema({
  type: { type: String, enum: ['person', 'organization']},
  fullName: String,
  shortName: String,
  firstName: String, 
  lastName: String, 
  organization: String, // if contact is an individual
  orgShortName: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  phones: [
    {
      type: { type: String },
      value: String
    }
  ],
  email: String,
  notes: [
    { 
      type: String,
      createdBy: { type: ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now() }
    }
  ]
},
// Options
{ timestamps: true })


module.exports = mongoose.model('Contact', contactSchema);

// PERSON MODEL:

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const personSchema = new mongoose.Schema({
  fullName: String,
  nickName: String,
  firstName: String, 
  lastName: String, 
  relationship: String, // client, opposite party, attorney, service provider
  organization: { // for individuals
    type: ObjectId, ref: 'Organization'
  },
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


module.exports = mongoose.model('Person', personSchema);

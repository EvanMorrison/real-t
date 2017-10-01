// ORGANIZATION MODEL: legal organizations

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const organizationSchema = new mongoose.Schema({
  name: String,
  shortName: String,
  entityType: String, // corporation, trust, limited liability company, etc.
  relationship: String, // client, opposite party                                  ''''''''', service provider
  stateOfOrigin: String, 
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  phone: String
})

organizationSchema.virtual('people', {
      ref: 'Person',
      localField: '_id',
      foreignField: 'organization'
})

module.exports = mongoose.model('Organization', organizationSchema);

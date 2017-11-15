
// PROPERTY: 

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const propertySchema = new mongoose.Schema({
  address1: String,
  address2: String,
  city: String,
  state: {type: String, default: 'UT'},
  stateFull: {type: String, default: 'Utah'},
  zip: String,
  county: String,
  taxId: String,
  legalDescription: String,
  imageUrls: [ String ]
})

module.exports = mongoose.model('Property', propertySchema);

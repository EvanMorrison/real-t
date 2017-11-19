// PROPERTY: 

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const propertySchema = new mongoose.Schema({
  address1: String,
  address2: String,
  city: String,
  state: {
    type: String,
    default: 'Utah'
  },
  stateShort: {
    type: String,
    default: 'UT'
  },
  zip: String,
  county: String,
  parcelTaxId: String,
  legalDescription: String,
  
})

module.exports = mongoose.model('Property', propertySchema);

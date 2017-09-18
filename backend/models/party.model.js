const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const partySchema = new mongoose.Schema({
  type: { type: String, enum: ['individual', 'organization']},
  individual: { type: ObjectId, ref: 'Person' },
  organization: { type: ObjectId, ref: 'Organization' }
})


module.exports = mongoose.model('Party', partySchema);

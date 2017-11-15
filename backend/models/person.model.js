// PERSON MODEL:

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const personSchema = new mongoose.Schema({
    type : { type: String, enum: ['individual', 'organization', 'trust'], default: 'organization'},
    fullOrgName: String,  // full legal name of business, trust, or law firm as applicable
    shortOrgName: String, // common reference name or abbreviation
    orgDisplayName: String,
    stateWhereOrganized: String,
    firstName: String,
    lastName: String,
    fullName: String,
    shortName: String, // nickname or abbreviated first name the contact goes by, eg. Will or Bill for William, or Hank for Henry
    displayName: String, 
    isSignor: Boolean, // is contact person legally authorized to sign for lender entity
    title: String, // eg., "Manager", "Member", "President", "Trustee"
    phones: [
      {
        type: { type: String }, // eg. mobile, office, home
        value: String,
        _id: false
      }
    ],
    emails: [
       { value: String, _id: false }
    ],
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    notes: [
      {
        note: { type: String },
        createdBy: { type: ObjectId, ref: 'User' },
        lastModified: { type: Date, default: Date.now() },
        _id: false
      }
    ],
    tags: [String],
    
    
  },
// Options
{ timestamps: true,
  discriminatorKey: 'kind',
  setDefaultsOnInsert: true,
  toObject: { retainKeyOrder: true } })


const Person = mongoose.model('Person', personSchema);

const attorneySchema = new mongoose.Schema({
  clients: [
    { case: { type: ObjectId, ref: 'Case' },
      client: { type: ObjectId, ref: 'Person' }
    }
  ],
})

const Attorney = Person.discriminator('Attorney', attorneySchema)

const otherPartySchema = new mongoose.Schema({
  roles: [
    { case: { type: ObjectId, ref: 'Case' },
      role: String,
      getsNotice: Boolean
    }
  ],
})

const OtherParty = Person.discriminator('OtherParty', otherPartySchema);


personSchema.pre('save', function(next) {  // allows for adding leading or middle initials, or suffixes, eg. Jr.
  if (!this.fullName && this.firstName && this.lastName) this.fullName = `${this.firstName} ${this.lastName}`;
  if (!this.displayName && this.shortName && this.lastName) this.displayName = `${this.shortName} ${this.lastName}`;
  else if (!this.displayName && this.firstName && this.lastName) this.displayName =  `${this.firstName} ${this.lastName}`;
  if (this.type !== 'individual') {
    if (!this.orgDisplayName && (this.shortOrgName || this.longOrgName)) this.orgDisplayName = this.shortOrgName || this.longOrgName;
  }
  next();
})
  



module.exports = {Person, Attorney, OtherParty};

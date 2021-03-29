import './caseSetupStyles.scss';
import profileLookup from './profileLookup.component';
import people from './people';
import caseSetup from './caseSetup.component';
import addProperty from './property/addProperty.component';
import addLoan from './loan/addLoan.component';
import addDocs from './documents/addDocuments.component';

export default function(app) {
  profileLookup(app);
  people(app);
  caseSetup(app);
  addProperty(app);
  addLoan(app);
  addDocs(app);
}

import './listView.scss';
import listView from './listView.service';
import caseList from './caseList.component';
import caseComponent from './case.component';

export default function(app) {
  listView(app);
  caseList(app);
  caseComponent(app);
}

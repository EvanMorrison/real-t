import './caseDetail.scss';
import caseDashboard from './caseDashboard.component';
import timeline from './timeline.component';
import caseInfo from './caseInfo.component';

export default function(app) {
  caseDashboard(app);
  timeline(app);
  caseInfo(app);
}

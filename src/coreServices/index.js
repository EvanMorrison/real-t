import authService from './auth.service';
import caseService from './case.service';

export default function(app) {
  authService(app);
  caseService(app);
}

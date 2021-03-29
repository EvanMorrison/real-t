import './infoCard.scss';
import personInfo from './personInfo.component';
import propertyInfo from './propertyInfo.component';
import loanInfo from './loanInfo.component';
import documentInfo from './documentInfo.component';

export default function(app) {
  personInfo(app);
  propertyInfo(app);
  loanInfo(app);
  documentInfo(app);
}

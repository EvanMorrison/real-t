import profileComponents from './profileComponents';
import editButton from './editButton/editButton.component';
import editToolbar from './editToolbar/editToolbar.component';

export default function(app) {
  profileComponents(app);
  editButton(app);
  editToolbar(app);
}

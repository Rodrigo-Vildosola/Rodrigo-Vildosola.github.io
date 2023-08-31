import { combineReducers } from 'redux';
import { languageReducer } from './index';
import { exampleReducer } from './example';
import { authReducer } from './auth';
import { clientsReducer } from './clients';
import { usersReducer } from './users';
import { notificationsReducer } from './notifications';
import { projectsReducer } from './projects';
import { recordsReducer } from './records';
import { reportsReducer } from './reports';

export const rootReducer = combineReducers({
  lang: languageReducer,
  example: exampleReducer,
  auth: authReducer,
  clients: clientsReducer,
  users: usersReducer,
  projects: projectsReducer,
  notifications: notificationsReducer,
  records: recordsReducer,
  reports: reportsReducer,
});
